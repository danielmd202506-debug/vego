# Design

## Visual System

This workspace follows the current VEGO website/design-system direction captured in `outputs/manual-20260612-vego/presentations/vego-design-system/slides/theme.mjs` and the component library preview.

## Brand Assets

- Primary logo: `assets/logo.png`
- Use the logo as an image asset in navigation and brand moments instead of rebuilding it with text or a temporary mark.

## Color Tokens

- Ink: `#17351f`
- Text: `#31513a`
- Muted: `#687a67`
- Cream: `#fbf4df`
- Oat: `#f4ead0`
- Mist: `#f5f8ef`
- Line: `#d9dec3`
- Green: `#2f663b`
- Forest: `#164d5d`
- Sage: `#8aa970`
- Lime: `#d9e88b`
- CTA: `#ffd976`
- Sale / Clay: `#a9502e`
- Orange: `#ffad4f`
- Red: `#b84b3f`
- White: `#ffffff`

## Typography

- Use Arial / Helvetica for functional UI labels, controls, product details, and dense ecommerce information.
- Use Georgia / Times New Roman only for large brand-led headlines where VEGO needs an editorial garden tone.
- Keep letter spacing at `0`.
- Keep labels readable and compact. Avoid tiny tracked uppercase patterns.

## Layout

- Prefer full-width website bands with constrained internal content.
- Product and configurator surfaces should feel like ecommerce tools, not dashboards or game editors.
- Use square or lightly softened corners only when the local component requires it. VEGO component previews are mostly rectangular.
- Use 1px dividers and color-blocking before decorative shadows.

## Components

- Primary CTA uses `#ffd976` with dark text.
- Secondary actions use white or mist surfaces with green text.
- Selected states use green outlines and pale green backgrounds.
- Swatches should show real color blocks, not text-only options.
- Summary panels should be scannable and directly usable by cart or support.

## Motion

- Motion is functional: canvas drag, rotate, zoom, selected state updates, and short toast feedback.
- Respect reduced motion.

## Accessibility

- Target WCAG AA contrast.
- Interactive controls need visible focus states and at least 44px touch targets.
- Do not rely on color alone for selected options.
