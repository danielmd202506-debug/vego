# VEGO Design System

This folder is the engineering entry point for the VEGO design system.

It does not replace Figma or Notion:

- Figma is the design asset source.
- GitHub is the engineering code source.
- Notion is the decision log and version note source.
- Shopify preview theme is the validation environment before production.

## Current Scope

Version: `v0.1`

This baseline documents how DS decisions should become Shopify-ready code:

- semantic tokens
- CSS custom properties
- Liquid snippets and sections
- governance records
- QA checks before release

## Folder Structure

```text
vedo-design-system/
  tokens/
    tokens.json
  shopify/
    token-mapping.md
    implementation-contract.md
  docs/
    governance.md
    qa-checklist.md
  CHANGELOG.md
```

## Source Split

| Area | Source | Role |
| --- | --- | --- |
| Design assets | Figma | Components, variables, patterns, usage examples |
| Engineering code | GitHub | Tokens, CSS variables, Liquid snippets, theme PRs |
| Decisions and versions | Notion | Decision records, version notes, release checklist |
| Runtime validation | Shopify preview theme | Staging QA before production publish |

## Definition of Done

A DS change is complete only when all four are synchronized:

1. Figma component or variable is updated.
2. GitHub token/CSS/Liquid change is merged.
3. Shopify preview theme is validated.
4. Notion decision record and version note are updated.

