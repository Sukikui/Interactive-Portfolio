import type { RepositoryReference } from "@/content";

export function getGitHubRepositoryUrl(repository: RepositoryReference) {
  return `https://github.com/${repository.owner}/${repository.name}`;
}

export function getRepositoryAnchorId(repository: RepositoryReference) {
  return `repository-${repository.owner}-${repository.name}`.toLowerCase();
}
