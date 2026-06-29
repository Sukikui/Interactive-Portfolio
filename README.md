<div align="center">

# Interactive Portfolio

Personal academic portfolio built as a content-driven web application.

It presents my profile, research interests, experience, education, technical skills, GitHub
projects, documents and custom interactive presentations for targeted visitors.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TanStack](https://img.shields.io/badge/TanStack-Start-FF4154?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-ready-000000?logo=vercel&logoColor=white)

</div>

## ✨ Features

- Responsive portfolio with a hero section, profile snapshot, research interests, experience,
  education, GitHub projects, technical skills and CV card.
- Content-first architecture: most personal information is edited from
  [`src/content/`](src/content/) instead of being hard-coded inside components.
- Interactive presentation route at `/for/:slug`, backed by ignored local JSON files and private
  remote JSON files hosted in a private Vercel Blob store.
- GitHub repository cards enriched from the public GitHub API and cached in `localStorage`.
- Public documents hosted outside the repository and configured through Vercel environment
  variables.
- Vercel Analytics integration.
- Clear license split between reusable source code and non-reusable personal content/assets.

## 🧱 Tech stack

| Area            | Tools                                |
| --------------- | ------------------------------------ |
| App             | React 19, TypeScript, TanStack Start |
| Routing/data    | TanStack Router, TanStack Query      |
| Styling         | Tailwind CSS v4, Lightning CSS       |
| Build/runtime   | Vite, Nitro, Bun                     |
| Deployment      | Vercel                               |
| Dynamic content | Private Vercel Blob store            |
| Documents       | Vercel Blob URLs                     |
| Analytics       | Vercel Analytics                     |

## 🚀 Getting started

| Command             | Purpose                    |
| ------------------- | -------------------------- |
| `bun install`       | Install dependencies       |
| `bun run dev`       | Start the local dev server |
| `bun run build`     | Build for production       |
| `bun run lint`      | Run ESLint                 |
| `bunx tsc --noEmit` | Run TypeScript checks      |

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

The site runs locally at:

```txt
http://localhost:8080
```

Before shipping changes, run:

```bash
bun run build
bun run lint
bunx tsc --noEmit
```

## 📁 Project structure

```txt
src/
  assets/                 Imported images used by the app
  components/portfolio/   Portfolio UI components
  content/                Editable portfolio content
  hooks/                  Client-side hooks
  lib/                    Shared utilities
  routes/                 TanStack Start file-based routes
local-documents/          Local private PDFs, ignored by Git
local-presentation-configs/ Local private presentation JSON, ignored by Git
```

Important files:

- [`src/content/site.ts`](src/content/site.ts): identity, SEO, hero, contact links, footer and stack.
- [`src/content/snapshot.ts`](src/content/snapshot.ts): short “at a glance” profile highlights.
- [`src/content/overview.ts`](src/content/overview.ts): profile overview and research interests.
- [`src/content/experience.ts`](src/content/experience.ts): experience timeline.
- [`src/content/education.ts`](src/content/education.ts): education timeline.
- [`src/content/projects.ts`](src/content/projects.ts): GitHub repository groups.
- [`src/content/skills.ts`](src/content/skills.ts): technical skills.
- [`src/content/sections.ts`](src/content/sections.ts): section order, navigation labels and CV card.
- [`src/content/documents.ts`](src/content/documents.ts): public document URLs.

See [`src/content/README.md`](src/content/README.md) for content editing details.

## 📝 Editing content

Most updates should be made in [`src/content/`](src/content/).

The intent is to keep the codebase simple and avoid scattering portfolio data across UI components.
Components should describe presentation and behavior; content files should describe what is displayed.

Examples:

- Change the job title or hero text in [`src/content/site.ts`](src/content/site.ts).
- Add an experience entry in [`src/content/experience.ts`](src/content/experience.ts).
- Add a GitHub project in [`src/content/projects.ts`](src/content/projects.ts).
- Reorder sections in [`src/content/sections.ts`](src/content/sections.ts).
- Upload updated PDFs to Vercel Blob and update the matching document URL environment variables.

## 📄 Documents and assets

Public PDFs are intentionally not stored in the repository.

```txt
local-documents/
```

This local folder is ignored by Git and is only meant to keep private working copies before upload.

The site reads document URLs from environment variables, for example on this website:

```txt
VITE_CV_URL
VITE_CREATIS_POSTER_URL
VITE_BOVO_REPORT_URL
```

In production, these should point to the corresponding Vercel Blob public URLs.
Because they are `VITE_*` variables, they are embedded at build time: update them in Vercel, then
redeploy the site.
These Blob URLs are public so the browser can open the PDFs directly; this does not grant reuse
rights over the documents.

Imported visual assets, such as the hero background and profile picture, still live in:

```txt
src/assets/
```

Do not add PDFs back to `public/` or `src/assets/`.

## 🎬 Interactive presentations

Custom presentations are available under:

```txt
/for/:slug
```

The route resolves presentations in this order:

1. ignored local JSON from `local-presentation-configs/presentations/<slug>.json`;
2. private Vercel Blob object at `presentations/<slug>.json`.

Each presentation defines:

- `slug`
- `language`
- `companyName`
- custom hero content
- presentation controls
- ordered steps with target section IDs

Private local presentation files use the same path shape as Vercel Blob:

```txt
local-presentation-configs/presentations/<slug>.json
```

Example:

```txt
local-presentation-configs/presentations/company-x.json
```

The JSON value must be the presentation object itself.

Upload ignored local presentation JSON files to Vercel Blob with:

```bash
bun run presentations:validate
bun run presentations:upload
```

The upload uses `PRES_CONFIGS_BLOB_STORE_ID` and `BLOB_READ_WRITE_TOKEN` locally. See
[`src/content/presentations/README.md`](src/content/presentations/README.md) for details.

## ▲ Deployment

The project is designed to deploy on Vercel.

Build command:

```bash
bun run build
```

Public documents require these Vercel environment variables:

```txt
VITE_CV_URL
VITE_CREATIS_POSTER_URL
VITE_BOVO_REPORT_URL
```

Remote interactive presentations require the presentation Blob store id plus server-side Blob
credentials:

```txt
PRES_CONFIGS_BLOB_STORE_ID
BLOB_READ_WRITE_TOKEN
```

If no local JSON or private Blob object exists for a slug, the route simply renders the normal
portfolio.

Current [`vercel.json`](vercel.json) disables Git-triggered deployments:

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

Change this only if automatic Vercel deployments should be re-enabled.

## 🐙 GitHub repository cards

Project cards are defined in [`src/content/projects.ts`](src/content/projects.ts).

At runtime, the site fetches public GitHub repository metadata:

- description;
- top languages;
- license;
- release count.

The result is cached in `localStorage` for six hours to avoid repeated API calls.

## 🛠️ Development notes

- Prefer reusing the existing stack and patterns before adding new dependencies.
- Keep portfolio content in [`src/content/`](src/content/) whenever possible.
- Keep private document copies in `local-documents/`, which is ignored by Git.
- Keep private presentation JSON in `local-presentation-configs/`, which is ignored by Git.
- Keep route files in [`src/routes/`](src/routes/); this project uses TanStack Start file-based
  routing.
- [`src/routeTree.gen.ts`](src/routeTree.gen.ts) is generated and should not be edited manually.

## ⚖️ License

The original software source code in this repository is licensed under the
[MIT License](LICENSE).

Portfolio content, personal information, images, documents, posters, reports and other assets are
not covered by the MIT License. See [CONTENT_LICENSE.md](CONTENT_LICENSE.md) for the full content
and asset licensing terms.
