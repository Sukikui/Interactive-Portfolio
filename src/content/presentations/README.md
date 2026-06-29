# Interactive presentations

Interactive presentations are loaded for `/for/:slug`.

## Local private Blob mirror

Private or company-specific presentations should live as one JSON file per slug:

```txt
local-presentation-configs/presentations/<slug>.json
```

This folder is gitignored. These files mirror remote Blob presentation data locally and have
priority over remote Blob files when testing.

Example:

```txt
local-presentation-configs/presentations/company-x.json
```

The file content must be the presentation object itself:

```json
{
  "slug": "company-x",
  "language": "fr",
  "companyName": "Company X",
  "hero": {
    "summary": []
  },
  "steps": []
}
```

The value must follow the plain object shape used by Vercel Blob: strings,
arrays and simple objects only. Each presentation owns its language with
`language: "en"` or `language: "fr"` so the floating bar labels match the
presentation content.

Resolution order:

1. `local-presentation-configs/presentations/<slug>.json`
2. private Vercel Blob object at `presentations/<slug>.json`

Upload the local private JSON entries to Vercel Blob with:

```bash
bun run presentations:validate
bun run presentations:upload
```

The upload command requires:

```txt
PRES_CONFIGS_BLOB_STORE_ID
BLOB_READ_WRITE_TOKEN
```

At runtime, Vercel also needs `PRES_CONFIGS_BLOB_STORE_ID` and server-side Blob credentials.
With the standard Vercel Blob setup, `BLOB_READ_WRITE_TOKEN` is the credential used locally and by
the server to read private presentation JSON.

## Remote presentations

Remote presentations are loaded from the private Vercel Blob store only when no local JSON matches
the requested slug.

For a slug:

```txt
/for/company-x
```

the server reads:

```txt
presentations/company-x.json
```

from the private Blob store. The JSON content is never stored in Git and is not
directly accessible from the browser.
