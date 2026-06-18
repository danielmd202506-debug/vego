# VEGO Design System Foundation v1

Published baseline for the VEGO website design system.

This folder is the engineering-facing release package for **VEGO Design System Foundation v1**. It is not a replacement for the Figma file. It contains the source tokens, Shopify-facing variables, component implementation rules, demo references, and QA checklist needed for development review and implementation.

## Source Of Truth

- Figma foundation file: https://www.figma.com/design/ooqTDH1ehoUDbKCIGUD9YC/VEGO-Design-System-Foundation-v1
- Current baseline: live VEGO Shopify website visual language
- Engineering repository: this GitHub folder

## What Goes Here

| Area | File | Purpose |
|---|---|---|
| Token source | `tokens/tokens.json` | Source values for color, typography, radius, shadow, spacing, and motion |
| Shopify variables | `shopify/vego-tokens.css` | CSS custom properties that Shopify theme code can consume |
| Component contract | `docs/component-contract.md` | How Figma components map to Shopify Liquid/snippets/sections |
| Usage SOP | `docs/designer-sop.md` | How designers should use and extend the library |
| QA checklist | `docs/qa-checklist.md` | Release checks before theme implementation |
| Demo | `demos/vego-pdp-ds-demo.html` | PDP example assembled from the DS direction |
| Assets | `assets/logos/` | VEGO logo files used by the DS |

## Relationship Between Figma, GitHub, And Shopify

```text
Figma
  Defines what the system looks like and how designers compose it.

GitHub
  Stores tokens, CSS variables, component rules, Liquid implementation notes,
  QA checklist, and version history.

Shopify Theme
  Executes the implementation through CSS, Liquid sections, snippets, assets,
  JavaScript, and controlled theme settings.
```

## Current Status

Foundation v1 is an initialization baseline. Values should follow the current VEGO Shopify website unless the team explicitly approves a visual refresh.

Release status:

- Color, typography, logo, radius, shadow, spacing, and motion baseline documented.
- Core ecommerce components documented for Shopify implementation.
- PDP demo included as implementation reference.
- Requires final visual QA against live Shopify pages before production rollout.

