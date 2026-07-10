---
name: tailwind-v4-style-guardrails
description: Enforce the Tailwind CSS v4 styling conventions used in this portfolio. Use when creating or editing React, JSX, CSS, or layout code in this workspace that relies on Tailwind utilities, project theme tokens, light/dark theme classes, or semantic color names. Prefer this skill whenever styling changes should stay consistent with the project's `@theme` tokens and should avoid legacy arbitrary-value classes when Tailwind v4 has a canonical utility.
---

# Tailwind V4 Style Guardrails

## Overview

Use the project's Tailwind v4 token system consistently. Prefer semantic utility classes generated from `@theme`, keep light/dark behavior driven by project tokens, and replace older arbitrary-value class patterns when Tailwind offers a canonical utility.

## Workflow

1. Read `src/index.css` before changing styling.
2. Prefer the semantic utilities already defined by project tokens:
   `bg-bg`, `bg-surface`, `bg-card`, `text-text`, `text-muted`, `text-primary`, `text-secondary`, `border-border`, `shadow-soft`.
3. Use `cn()` from `src/lib/utils.js` for component class composition when classes are conditional or shared.
4. When a class triggers a Tailwind v4 "can be written as" warning, rewrite it to the canonical form instead of leaving the arbitrary form in place.
5. Add new design tokens in `@theme` and the `--theme-*` mappings in `src/index.css` instead of sprinkling raw values through JSX.

## Rules

### Prefer semantic project utilities

- Prefer `bg-surface` over raw background values in JSX.
- Prefer `text-muted` over repeated one-off muted text utilities.
- Prefer `border-border` over custom border color values in components.
- Prefer updating `src/index.css` once rather than repeating custom values across many files.

### Prefer canonical Tailwind v4 utilities

- Prefer `rounded-4xl` over `rounded-[2rem]`.
- Prefer built-in spacing scale utilities over arbitrary rem values when they match exactly.
- Examples: use `h-108`, `sm:h-120`, `xl:h-128`, `max-w-44`, `lg:max-w-48`, and `lg:min-h-68` instead of the equivalent arbitrary values.
- Prefer `tracking-tight` when it matches the intended letter spacing instead of `tracking-[-0.05em]`.
- Treat border radius warnings as part of scope: when Tailwind suggests a standard radius utility, replace the arbitrary radius with the canonical utility.
- Prefer `text-(--token)` or, better, token-generated utilities from `@theme` when available.
- Prefer direct built-in utilities when Tailwind already has them instead of arbitrary values.

### Keep theme behavior centralized

- Keep light and dark values in `src/index.css`.
- Let components consume semantic utilities only.
- Set theme mode via `document.documentElement.dataset.theme`.
- Persist theme preference with localStorage when adding toggles.

## Canonical replacements

Read `references/canonical-replacements.md` when:

- Tailwind warns that a class can be written in a shorter or canonical way.
- You are unsure whether to use a semantic token utility or an arbitrary value.
- You are adding new reusable styling patterns in JSX.

## Editing guidance

- Keep class strings readable by grouping layout, spacing, and semantic theme classes.
- Use `cn()` when conditional classes are present; plain string literals are fine for static class lists.
- Do not introduce old Tailwind habits like arbitrary values for spacing, radius, or colors if an equivalent v4 utility already exists.
- Do not bypass the token system with hardcoded light/dark colors in components unless the user explicitly asks for a one-off exception.
