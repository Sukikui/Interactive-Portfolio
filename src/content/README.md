# Portfolio content

All public portfolio information lives in this directory. Components only control presentation and
behavior.

## Common edits

- `site.ts`: identity, SEO, hero, contact links, images, and footer.
- `overview.ts`: presentation paragraphs and research interests.
- `education.ts`: education timeline entries.
- `experience.ts`: experience timeline entries.
- `projects.ts`: GitHub repository groups.
- `skills.ts`: technical skill groups.
- `snapshot.ts`: compact profile highlights.
- `sections.ts`: section order, headings, navigation labels, CV card, and section composition.

The footer repository is selected in `site.ts` from the `projectRepositories` catalog in
`projects.ts`, so its link and repository tile always share the same reference.

TypeScript validates every content file during development and build.

## Add a section

Add an object to `portfolioSections` in `sections.ts`. Its `type` selects an existing renderer:

- `timeline`: education or experience-style entries.
- `repositories`: grouped GitHub repository cards.
- `skills`: grouped technical skill tags.
- `snapshot`: compact profile highlight list.
- `download`: a download callout card.
- `split`: two prose or bullet columns sharing one visual row.

The header navigation is generated automatically from this array. Reuse an existing type before
introducing a new renderer.
