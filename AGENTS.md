# Repository Guidelines

- Code Style: Follow the existing code style and conventions. Use consistent formatting and naming.
- Git: Do not manage versioning actions; maintainers handle commits, pushes, branches, tags, releases, and PR creation/updates.
- Git: When the user asks for a commit message or PR message, read-only git commands are allowed and recommended to inspect unpushed/uncommitted changes and existing commit/PR naming habits. Prefer the existing history first. If no stronger pattern applies, use action prefixes such as `feat:`, `fix:`, `docs:`, or `chore:` followed by a concise detail. A scoped action is allowed for precision, for example `fix(commands): ...`.
- Principle: Adhere strictly to DRY; prefer shared utilities to duplication.
- No source files with more than 350 lines; split into focused modules if needed. This limit does not apply to docs, data files, generated files, lockfiles, or binary assets.
- When you clean up old code or remove features, also remove related helpers, submodules, and tests in order to keep the codebase clean and DRY.
- When the user asks a question, asks for an idea, or frames a request as a discussion, answer and discuss first; do not implement changes until the user gives explicit approval.


<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
