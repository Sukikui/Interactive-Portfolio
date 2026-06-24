import { useEffect, useState } from "react";

import type { RepositoryReference } from "@/content";

export type RepositoryData = {
  description: string | null;
  languages: { name: string; percentage: number }[];
  license: string | null;
  releases: number;
};

const CACHE_TTL = 6 * 60 * 60 * 1000;

function readCache(key: string): { data: RepositoryData; timestamp: number } | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as { data: RepositoryData; timestamp: number }) : null;
  } catch {
    return null;
  }
}

export function useRepositoryData(repository: RepositoryReference) {
  const cacheKey = `repo-cache:${repository.owner}/${repository.name}`;
  const [data, setData] = useState<RepositoryData | null>(() => {
    if (typeof window === "undefined") return null;
    return readCache(cacheKey)?.data ?? null;
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = readCache(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data);
      return;
    }

    const base = `https://api.github.com/repos/${repository.owner}/${repository.name}`;
    Promise.all([
      fetchJson<{
        description: string | null;
        license: { spdx_id?: string; name?: string } | null;
      }>(base),
      fetchJson<Record<string, number>>(`${base}/languages`),
      fetchReleaseCount(`${base}/releases?per_page=1`),
    ])
      .then(([info, languages, releases]) => {
        if (cancelled) return;
        const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0) || 1;
        const license = info.license;
        const next: RepositoryData = {
          description: info.description,
          languages: Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, bytes]) => ({ name, percentage: (bytes / total) * 100 })),
          license:
            license?.spdx_id && license.spdx_id !== "NOASSERTION"
              ? license.spdx_id
              : (license?.name ?? null),
          releases,
        };
        setData(next);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data: next, timestamp: Date.now() }));
        } catch {
          // Ignore storage quota and privacy-mode errors.
        }
      })
      .catch(() => {
        if (cancelled) return;
        if (cached) setData(cached.data);
        else setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, repository.name, repository.owner]);

  return { data, error };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  return response.json() as Promise<T>;
}

async function fetchReleaseCount(url: string): Promise<number> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  const releases = (await response.json()) as unknown[];
  const lastPage = response.headers
    .get("Link")
    ?.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/)?.[1];
  return lastPage ? Number.parseInt(lastPage, 10) : releases.length;
}
