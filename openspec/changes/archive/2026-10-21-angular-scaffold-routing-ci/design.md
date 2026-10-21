# Design

## Context

See proposal.md - Why. The repo had no Angular project; everything here is
first-time setup. Decisions below (state approach, test runner, spec-first
exemption) were confirmed with the owner before building, per the pattern
workflow, and recorded as patterns in the sieujs knowledge base
(`angular-state-signals-and-services.md`, `angular-cli-default-test-lint.md`,
`foundational-tooling-exempt-from-spec-first.md`).

## Goals / Non-Goals

**Goals:**
- A working Angular project (build/lint/test all green) with routing wired up.
- A state-management convention the rest of the Angular milestone can reuse.
- CI that blocks a broken build/lint/test from merging.

**Non-Goals:**
- Any real feature or page beyond a placeholder home route.
- Styling system, component library, or design tokens (not asked for here).
- E2E testing (not part of this ticket).

## Decisions

- **Angular CLI defaults, not a custom setup.** Scaffolded with `ng new
  --routing --style=css --ssr=false --strict`, then `ng add
  @angular-eslint/schematics`. No SSR (not needed yet, adds complexity), no
  Tailwind/Material (not asked for, native CSS is enough for now).
- **State: signals + injectable services, no state library.** Owner-approved
  alternative to NgRx. Matches Angular's own direction (signals are the
  framework's native reactivity primitive) and needs zero new dependencies.
  Revisit only if shared async state genuinely outgrows this.
- **Test runner: whatever `ng new` scaffolds.** On Angular 22 that is Vitest
  + jsdom (the CLI's current default `@angular/build:unit-test` builder), not
  the Jasmine/Karma of older Angular versions. The owner approved "CLI
  defaults" before this was known to be Vitest; no separate dependency was
  hand-picked.
- **No Spec Kit spec in document-specs for this ticket.** Pure
  scaffolding/tooling, no product behavior — owner confirmed foundational
  tickets (like the earlier SIE-85/86/87 infra tickets) skip spec-first. This
  OpenSpec change is the only record of the decision, with `skip_specs: true`
  since there's no spec-level behavior to describe.
- **`eslint.config.js` as ESM, not CommonJS.** The Angular ESLint schematic
  generates a CommonJS file, but the repo's `package.json` has `"type":
  "module"`. Converted to `import`/`export default` rather than renaming to
  `.cjs`, to stay consistent with the rest of the repo.

## Risks / Trade-offs

- [`npm audit` reports a high-severity `vite`/`launch-editor` issue via
  `@angular/build`'s current release (dev-server only, Windows-specific
  arbitrary command execution)] → No fix available without downgrading
  `@angular/build` to 21.2.27, which would undo the Angular 22 scaffold this
  ticket asks for. Left open; flagged in the PR for the owner to decide.
- [Signals + services state approach may not scale to complex async
  orchestration later] → Mitigation is explicit: revisit and bring in a state
  library only when that actually happens, not pre-emptively.
