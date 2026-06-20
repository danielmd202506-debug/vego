# VEGO Handoff Notes

This document explains how to continue the VEGO project from another computer or with another team member.

## Current GitHub URLs

Branch:

```text
https://github.com/danielmd202506-debug/vego/tree/codex/publish-vego-ds-foundation-v1
```

Design-system release directory:

```text
https://github.com/danielmd202506-debug/vego/tree/codex/publish-vego-ds-foundation-v1/vego-design-system-foundation-v1
```

Open a PR:

```text
https://github.com/danielmd202506-debug/vego/pull/new/codex/publish-vego-ds-foundation-v1
```

## Move To Another Computer

On a Mac or another computer:

```bash
git clone https://github.com/danielmd202506-debug/vego.git
cd vego
git checkout codex/publish-vego-ds-foundation-v1
```

If the branch has not been merged, always check out `codex/publish-vego-ds-foundation-v1` first. If it has been merged later, use the default branch.

## Local Files To Open

Open the PDP demo:

```bash
open vego-design-system-foundation-v1/demos/vego-pdp-ds-demo.html
```

Open the standalone PDP demo:

```bash
open vego-pdp-ds-demo.html
```

Open the VOC dashboard:

```bash
open vego-voc-system.html
```

Open the 3D configurator prototype:

```bash
open vego-3d-configurator-demo.html
```

## Important Figma Files

Foundation file:

```text
https://www.figma.com/design/ooqTDH1ehoUDbKCIGUD9YC/VEGO-Design-System-Foundation-v1
```

Component library file:

```text
https://www.figma.com/design/656lRfBOcD7GPHvfGvAUnq
```

## What To Review First

1. Read `DESIGN.md`.
2. Read `vego-design-system-foundation-v1/README.md`.
3. Read `vego-design-system-foundation-v1/docs/component-contract.md`.
4. Open `vego-design-system-foundation-v1/demos/vego-pdp-ds-demo.html`.
5. Compare key components against the live VEGO website before production implementation.

## Current Engineering Package

The DS release package is here:

```text
vego-design-system-foundation-v1/
```

It contains:

- `tokens/tokens.json`
- `shopify/vego-tokens.css`
- `docs/component-contract.md`
- `docs/designer-sop.md`
- `docs/qa-checklist.md`
- `docs/foundation-notes.md`
- `demos/vego-pdp-ds-demo.html`
- `assets/logos/`
- `CHANGELOG.md`

## Suggested Next Work

### Figma

- Finish visual QA for all component library pages.
- Ensure every component page includes the actual component preview, variants, usage rules, token mapping, and Shopify implementation notes.
- Check spacing and avoid overlapping documentation cards.
- Confirm badge variants include percent off, sale, new arrival, hot, guidance, and neutral/status labels.

### Shopify

- Convert `tokens/tokens.json` into production theme variables.
- Add or map `shopify/vego-tokens.css` into the Shopify theme assets.
- Implement reusable snippets for button, badge, price, product card, quantity stepper, modal, drawer, toast, and search.
- Keep Yotpo review output and Shopify-owned behavior as integration contracts instead of recreating third-party logic.

### QA

- Compare PDP, collection grid, cart drawer, search, footer, and mobile states against live Shopify.
- Check contrast for yellow CTA with green text.
- Verify quantity stepper, inventory constraints, sale price, compare-at price, sold-out, and review rendering.

## Clean-Up Notes

- Do not commit temporary login logs.
- Do not commit generated zip or bundle files unless explicitly needed for handoff.
- `.gitignore` excludes `*.log` and `*.zip`.
- A local Git bundle may exist as `vego-design-system-foundation-v1.bundle`; it is for emergency transfer only and is not part of the repository.

## Recommended PR Summary

```text
Publish VEGO Design System Foundation v1

- Adds engineering-facing DS release package
- Adds token source and Shopify CSS variables
- Adds component implementation notes and designer SOP
- Adds QA checklist and PDP demo
- Adds logo assets and handoff documentation
```

