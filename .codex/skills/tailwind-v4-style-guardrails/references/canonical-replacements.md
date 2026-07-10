# Canonical replacements

Use this file when updating JSX classes in this portfolio.

## Project token utilities

Prefer these generated semantic classes:

- `bg-bg`
- `bg-surface`
- `bg-card`
- `text-text`
- `text-muted`
- `text-primary`
- `text-secondary`
- `border-border`
- `shadow-soft`

These come from `@theme` in `src/index.css`. Update the theme tokens there instead of hardcoding repeated values in components.

## Common Tailwind v4 rewrites

- `rounded-[2rem]` -> `rounded-4xl`
- `tracking-[-0.05em]` -> `tracking-tight`
- `h-[27rem]` -> `h-108`
- `sm:h-[30rem]` -> `sm:h-120`
- `xl:h-[32rem]` -> `xl:h-128`
- `max-w-[11rem]` -> `max-w-44`
- `lg:max-w-[12rem]` -> `lg:max-w-48`
- `lg:min-h-[17rem]` -> `lg:min-h-68`
- Any arbitrary radius that matches a standard Tailwind radius scale should be rewritten to the standard utility when suggested by the editor.
- `border-[var(--color-border)]` -> `border-(--color-border)` if using a raw variable, but prefer `border-border` in this project
- `bg-[var(--color-surface)]` -> `bg-(--color-surface)` if using a raw variable, but prefer `bg-surface` in this project
- `text-[var(--color-muted)]` -> `text-(--color-muted)` if using a raw variable, but prefer `text-muted` in this project
- `shadow-[var(--shadow-soft)]` -> `shadow-(--shadow-soft)` if using a raw variable, but prefer `shadow-soft` in this project

## Decision rule

1. If a semantic token utility exists in this project, use it.
2. If no semantic utility exists but the project intentionally uses a CSS variable, use Tailwind's canonical variable shorthand.
3. If Tailwind already has a built-in utility for the exact value, use the built-in utility instead of an arbitrary one.
4. If none of the above fit, use an arbitrary value sparingly and keep it local to a genuine one-off case.
