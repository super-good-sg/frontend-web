# Tasks

## 1. Scaffold

- [x] 1.1 Generate the Angular 22 project (`ng new --routing --style=css --ssr=false --strict`) and merge it into the repo root alongside existing husky/commitlint tooling; verify with `npm run build`
- [x] 1.2 Add Angular ESLint (`ng add @angular-eslint/schematics`), convert the generated `eslint.config.js` to ESM to match `"type": "module"`; verify with `npm run lint`

## 2. Routing and state

- [x] 2.1 Add a home route (`src/app/pages/home/`) wired through `app.routes.ts` and `<router-outlet />`; verify with `npm run test -- --watch=false`
- [x] 2.2 Document the signals + injectable-services state approach (no state library) in design.md and the sieujs pattern index

## 3. CI

- [x] 3.1 Add `.github/workflows/ci.yml` running build, lint, and test on PRs and pushes to `main`; verify the workflow's steps match the local `npm run build/lint/test` commands that pass locally

## 4. Docs

- [x] 4.1 Fill in `CLAUDE.md` Commands and Folder map sections (previously TODO pending this ticket)
