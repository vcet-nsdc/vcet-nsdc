# Contributing

Thanks for your interest in contributing to **NSDC VCET Website**.

## Quick Start

1. Fork the repository: https://github.com/vcet-nsdc/vcet-nsdc
2. Clone your fork:

   ```bash
   git clone https://github.com/<your-username>/vcet-nsdc.git
   cd vcet-nsdc
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create `.env.local` (see [README.md](./README.md#configuration))
5. Run locally:

   ```bash
   npm run dev
   ```

## Branch Naming

Use short, descriptive branch names:

- `feat/<short-description>` for new features
- `fix/<short-description>` for bug fixes
- `chore/<short-description>` for tooling/maintenance
- `docs/<short-description>` for documentation-only changes

Examples:

- `feat/certificates-search`
- `fix/admin-export-filename`
- `docs/readme-api-examples`

## Commit Messages (Conventional Commits)

Follow Conventional Commits:

```
<type>(optional scope): <description>
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation only
- `refactor`: code refactor (no behavior change)
- `perf`: performance improvement
- `test`: tests
- `chore`: tooling/build/maintenance

Examples:

- `feat(register): add domain validation`
- `fix(api): handle missing auth header`
- `docs: add env var reference`

## Pull Requests

1. Ensure your branch is up to date:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Run quality checks:

   ```bash
   npm run lint
   npm run build
   ```

3. Open a Pull Request to `vcet-nsdc/vcet-nsdc` → `main`
4. Fill in the PR template and include:
   - What changed and why
   - Screenshots for UI changes
   - API details for route changes
   - Any breaking changes or migration notes

## Code Style and Linting

- TypeScript is used across the codebase
- ESLint is enforced via:

  ```bash
  npm run lint
  ```

- Prettier configuration exists in `.prettierrc` (formatting is encouraged)

Guidelines:

- Prefer existing utilities and patterns in `src/lib/*`
- Keep components small and focused
- Avoid introducing new dependencies unless necessary

## Issue Reporting

Use GitHub Issues: https://github.com/vcet-nsdc/vcet-nsdc/issues

Before opening an issue:

- Search existing issues to avoid duplicates
- Include clear reproduction steps (for bugs)
- Include screenshots/logs where relevant

When reporting bugs, include:

- Expected vs actual behavior
- Steps to reproduce
- Environment details (OS, Node version, browser)

For feature requests, include:

- The problem being solved
- Proposed solution (optional)
- Alternatives considered (optional)

