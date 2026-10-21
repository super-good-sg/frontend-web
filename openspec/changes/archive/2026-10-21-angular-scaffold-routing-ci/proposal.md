# Proposal

## Why

frontend-web had no Angular project yet, only repo scaffolding (CLAUDE.md, husky,
commitlint). SIE-61 is the foundation ticket for the Angular web app milestone
(M6); every later frontend ticket needs a project, a routing shell, and CI to
build on.

## What Changes

- Scaffold an Angular 22 application (standalone components, `ng new` defaults)
  at the repo root, alongside the existing husky/commitlint tooling.
- Add Angular Router with a minimal home route (`src/app/pages/home/`).
- Adopt signals + injectable services as the state approach; no state library
  (NgRx, Akita, etc.) until shared state genuinely needs one.
- Add Angular ESLint (`ng lint`) and keep the CLI's default test runner
  (Vitest, as of Angular 22) for `ng test`.
- Add a GitHub Actions CI workflow (`build-lint-test`) running build, lint,
  and test on every PR and push to `main`.
- Fill in the `CLAUDE.md` Commands and Folder map sections that were marked
  TODO pending this ticket.

## Capabilities

### New Capabilities
(none — this is tooling/scaffolding, not product behavior. `skip_specs: true`
is set in `.openspec.yaml`.)

### Modified Capabilities
(none)

## Impact

- Affected: repo root (`angular.json`, `src/`, `public/`, `tsconfig*.json`,
  `eslint.config.js`, `package.json`), `.github/workflows/ci.yml`, `CLAUDE.md`.
- New dependencies: `@angular/*`, `angular-eslint`, `eslint`, `typescript`,
  `vitest`, `jsdom`, `prettier` (all added by the Angular CLI schematics, not
  hand-picked).
- Known open item: `npm audit` flags a high-severity `vite`/`launch-editor`
  issue (dev-server only, Windows-specific arbitrary command execution) via
  `@angular/build`'s current release. The only fix available today downgrades
  `@angular/build` to `21.2.27`, a step back from the Angular 22 scaffold this
  ticket asks for. Left as-is pending an upstream patch; flagged for the
  owner to decide whether to downgrade now or wait.
