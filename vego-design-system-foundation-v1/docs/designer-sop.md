# Designer SOP

## How To Use The Library

1. Start from approved components before drawing custom UI.
2. Choose the component variant that matches the state: default, hover, selected, disabled, sale, sold-out, empty, or error.
3. Do not recolor commerce-critical components manually.
4. Use token roles, not decorative guesses.
5. Keep Shopify constraints visible: product data, inventory, compare-at price, Yotpo ratings, cart behavior, and theme settings.

## When To Request A New Component

Request a new component only when the need appears in a repeatable website pattern or a Shopify section.

Required proposal:

- Use case
- Page or Shopify section
- Required states
- Required data source
- Existing component that is insufficient
- Impact on development

## Change Flow

```text
Designer proposes update
  -> DS owner reviews token/component impact
  -> Developer checks Shopify feasibility
  -> Decision recorded
  -> Figma library updated
  -> GitHub token/CSS/component notes updated
  -> QA before release
```

## Do Not

- Do not create local one-off colors for price, CTA, badge, or selected state.
- Do not use badges as CTAs.
- Do not use price styles for promo labels.
- Do not make a component variant if it cannot be implemented in Shopify.
- Do not change live commerce hierarchy without product/design/dev alignment.

