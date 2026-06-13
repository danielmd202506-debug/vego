# Design

## Visual System

This workspace follows the current VEGO website/design-system direction captured in `outputs/manual-20260612-vego/presentations/vego-design-system/slides/theme.mjs` and the component library preview.

## Workflow Rules

- For VEGO design system work in Figma, use the `Dan` team by default unless the user explicitly chooses another team.
- Current Figma plan key for the `Dan` team: `team::1633771031208579050`.
- Figma component library structure: one component set per top-level component frame. Do not place multiple unrelated component sets inside one combined showcase frame except for audit/overview pages.

## Design System Directory Order

Use an industry-standard library order instead of a project-progress order:

1. Cover / source and scope
2. Foundations: principles, layer architecture, color, typography, spacing/radius, effects/motion, image rules, and token mapping
3. Engineering contract: Shopify theme boundary, CSS variables, and implementation ownership
4. Components: atomic and commerce components, each in its own top-level component frame
5. Patterns / templates: assembled page examples and reusable Shopify section patterns
6. Governance: decisions, decision ledger, QA, rollout, and handoff

Figma frame names should follow numbered ranges: `00` cover, `01-08` foundations and engineering, `10-29` components, `30-39` patterns/templates, and `90-99` governance. This keeps the library understandable for designers, developers, and operators.

## Brand Assets

- Primary logo: `assets/logo.png`
- Use the logo as an image asset in navigation and brand moments instead of rebuilding it with text or a temporary mark.
- Logo source size: `108 x 42px`; preserve the `2.57:1` ratio, use `32-36px` height in header, and do not stretch.

## Image System

- Image assets are not the same as image rules. Product photos, campaign banners, and temporary operational media live in the Shopify/CMS asset library; DS owns the ratios, containers, cropping rules, and QA criteria.
- Required ratios:
  - Logo: `108 / 42`
  - Product card image: `4 / 3`
  - PDP main gallery image: `1 / 1`
  - Category tile image: `4 / 3`
  - Hero desktop media: `16 / 7`
  - Hero mobile media: `4 / 5`
- Product-card images should keep the product complete and recognizable. Do not crop key product parts to chase a decorative composition.
- PDP gallery images should prioritize inspection. Use `object-fit: contain` when product detail would be lost by cropping.
- Category tile images should support navigation and not carry important text inside the bitmap.
- Hero and promo images may create campaign atmosphere, but the headline, CTA, price, and promo hierarchy must remain readable outside the image or on a controlled overlay.
- Missing/loading media should use a neutral mist placeholder, not a random decorative image.
- Shopify implementation contract: use `.vego-image[data-ratio][data-fit]` for reusable image containers; Ops can replace media but should not change ratio, crop behavior, or hierarchy tokens.

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

- Current live Shopify font source: `Custom-fonts.css` loads `Moret` and `Manrope`.
- Use Moret for brand display moments only: campaign hero headlines, editorial section titles, and selected PDP/brand-led product titles.
- Moret is currently available as Regular `400` only; do not fake heavy weights unless the licensed font file exists.
- Use Manrope for functional UI, navigation, product details, cards, prices, CTAs, labels, and guidance content.
- Use Arial / Helvetica only as fallback for Manrope.
- Use Georgia / Times New Roman only as fallback for Moret.
- Keep letter spacing at `0`.
- Keep labels readable and compact. Avoid tiny tracked uppercase patterns.

## Layout

- Prefer full-width website bands with constrained internal content.
- Product and configurator surfaces should feel like ecommerce tools, not dashboards or game editors.
- Use square or lightly softened corners only when the local component requires it. VEGO component previews are mostly rectangular.
- Use 1px dividers and color-blocking before decorative shadows.

## Effects / Shape / Motion Tokens

- Radius must be tokenized, not hand-entered per component: `0`, `2px`, `4px`, `6px`, `8px`, and `999px` for pill/badge only.
- Product cards and guidance cards should use restrained shadows. Do not use heavy decorative shadows to create hierarchy; use spacing, border, and content order first.
- Gradients are allowed for page background, hero atmosphere, and campaign surfaces. Do not use gradients for product cards, price, Add to Cart, or core controls.
- Elevation levels:
  - `shadow/none`: flat sections and quiet guidance surfaces
  - `shadow/hairline`: `0 0 0 1px rgba(23, 53, 31, 0.08)` for subtle outline reinforcement
  - `shadow/card`: `0 1px 3px rgba(23, 53, 31, 0.10)` for product cards and small panels
  - `shadow/popover`: `0 10px 24px rgba(23, 53, 31, 0.16)` for menus, dropdowns, and floating selectors
  - `shadow/drawer`: `0 18px 48px rgba(23, 53, 31, 0.22)` for cart drawer, mobile menu, and large overlay surfaces
- Shadow naming must be role-based, not size-based. Use `shadow/card`, `shadow/popover`, and `shadow/drawer`; avoid vague names such as `shadow/small`, `shadow/big`, `shadow/soft`, or `shadow/heavy`.
- General naming grammar: `category/role/state` in Figma and `--vego-category-role-state` in CSS. Examples: `shadow/card` -> `--vego-shadow-card`, `gradient/hero/soft` -> `--vego-gradient-hero-soft`, `motion/duration/base` -> `--vego-motion-duration-base`.
- Opacity is semantic: disabled, muted, and overlay. Do not manually lower text opacity if it creates contrast risk.
- Z-index is reserved for known layers: header, drawer, modal, toast. Avoid one-off z-index values in sections.
- Motion is functional and short: hover/focus state changes, drawer/menu open, selection updates. No decorative motion in commerce-critical flows.

## Components

- DS ownership principle: commerce stays stable, brand creates recognition, guidance explains choice, and operations configure only within guardrails.
- Brand layer owns recognition, tone, editorial imagery, campaign mood, and large brand-led moments. It must not steal priority from purchase actions.
- Guidance layer owns decision support such as Help Me Choose, PDP fit explanations, scenario filters, comparison, and selection education.
- Commerce layer owns prices, sale states, add-to-cart actions, product-card purchase paths, cart, and checkout-adjacent UI. These elements must remain visually stable.
- Shopify theme settings may expose content, media, copy, campaign assets, and a small whitelist of controlled promo tokens. Core hierarchy, component behavior, CTA ownership, typography roles, and spacing rules should remain code-owned.
- Primary commerce CTA uses `#ffd976` with dark text for persistent purchase actions such as Add to Cart and product-form submit.
- Campaign / promo CTA uses `#ffad4f` with dark text for temporary promotion heroes such as Father's Day Sale. Do not replace this with green.
- Green is for brand, selected states, navigation emphasis, and success states. Green is not the default fill for promo CTA or primary purchase CTA.
- Secondary actions use white or mist surfaces with green text.
- Promo badges use `#a9502e` or `#b84b3f` depending on urgency. They should not share the same token role as primary CTA.
- Selected states use green outlines and pale green backgrounds.
- Swatches should show real color blocks, not text-only options.
- Summary panels should be scannable and directly usable by cart or support.

## Homepage Hero Rules

- Preserve the current VEGO campaign hero structure unless a campaign changes: announcement bar, utility header, category nav, full-bleed hero image, large promotion typography, primary CTA, and offer-detail link.
- The first design-system task for the homepage hero is inventory and rule extraction, not visual redesign.
- Do not weaken a high-performing campaign hero only to make it look more "systematic"; systematize the successful pattern instead.
- For before/after concepts, show changes only when they improve an identified inconsistency such as token ownership, spacing, component state, or accessibility.

## Motion

- Motion is functional: canvas drag, rotate, zoom, selected state updates, and short toast feedback.
- Respect reduced motion.

## Accessibility

- Target WCAG AA contrast.
- Interactive controls need visible focus states and at least 44px touch targets.
- Do not rely on color alone for selected options.
