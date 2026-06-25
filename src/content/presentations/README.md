# Local presentations

Local presentations are test fixtures for `/for/:slug`.

They intentionally use the same plain data shape expected from the future Vercel
source: strings, arrays and simple objects only. Each presentation owns its
language with `language: "en"` or `language: "fr"` so the floating bar labels
match the presentation content.

To create a new local test, duplicate `demo.ts` or `demo-fr.ts`, change `slug`,
`language`, `companyName`, `hero` and `steps`, then add the exported object to
`local.ts`.

Current local URLs:

- `/for/demo`
- `/for/demo-fr`

Keep private or real company-specific presentations out of the repository.
