# QA Checklist

## Foundation

- Colors match current live VEGO Shopify website.
- Moret is used only for brand display moments.
- Manrope is used for functional UI.
- Letter spacing remains `0`.
- Radius and shadow values use approved tokens.
- CTA contrast is checked in actual usage.

## Components

- Button text is centered vertically and horizontally.
- Primary commerce CTA uses `#FFDD81` and green text.
- Badge variants include sale, percent off, new arrival, hot, guidance, and neutral/status labels.
- Price states cover regular, sale, compare-at, sold-out, and muted.
- Product card adapts to content without overlapping CTA.
- Quantity stepper follows Shopify `js-qty__wrapper` behavior.
- Review rating mirrors Yotpo stars and review count behavior.
- Drawer, modal, and toast have correct z-index and close behavior.
- Search supports predictive result, empty, loading, and mobile states.
- Footer works in desktop columns and mobile accordion.

## Shopify

- Tokens are implemented as CSS custom properties.
- Liquid snippets use component classes instead of inline one-off styling.
- Theme settings expose only controlled content, media, and safe token choices.
- Third-party-owned UI is documented as implementation contract, not duplicated logic.
- Mobile PDP/cart flows are tested before release.

