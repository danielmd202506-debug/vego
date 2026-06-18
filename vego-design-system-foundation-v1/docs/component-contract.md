# Component Implementation Notes

## One Naming Language

Figma component names, token names, CSS variables, and Shopify snippets should describe the same role.

Example:

```text
Figma token: color/commerce/cta
CSS variable: --vego-color-commerce-cta
Shopify usage: .vego-button--primary
Liquid snippet: snippets/vego-button.liquid
```

## Shopify Theme Structure

```text
Shopify Theme
  sections/   page-level modules
  snippets/   reusable Liquid fragments
  templates/  page templates
  assets/     CSS, JS, images
  config/     theme setting schema
```

Liquid is the Shopify theme template language. Snippets are reusable files written with Liquid. They are not the same layer.

```liquid
{% render 'vego-price', product: product %}
```

This calls a reusable snippet, usually:

```text
snippets/vego-price.liquid
```

## Component Ownership

| Component | Figma role | Shopify implementation | Notes |
|---|---|---|---|
| Button Primary | Commerce purchase action | `snippets/vego-button.liquid`, product form submit | Primary purchase CTA uses yellow token with green text |
| Badge | Promo/status label | `snippets/vego-badge.liquid` | Badge does not replace button or price |
| Price | Commerce price display | `snippets/vego-price.liquid` | Current, compare-at, sale, sold-out states |
| Product Card | Product discovery and purchase path | `snippets/vego-product-card.liquid` | Card height adapts to content but CTA alignment needs QA |
| Quantity Stepper | Quantity input | Shopify `js-qty__wrapper` contract | 44px minimum hit area, valid inventory constraints |
| Review Rating | Third-party review output | Yotpo/Shopify owned rendering | Five 15px Yotpo stars in `#F0A63B` |
| Drawer | Cart/mobile overlay | `sections/cart-drawer.liquid` or theme drawer module | Uses drawer z-index and drawer shadow |
| Modal/Dialog | Blocking explanation or recovery | `snippets/vego-modal.liquid` | Not for promo banners |
| Toast | Short feedback | `assets/vego-components.js` + toast container | Do not block purchase action |
| Search | Predictive search | Shopify predictive search section/snippet | Needs live data QA |
| Footer | Site navigation/trust | Shopify footer section | Responsive accordion on mobile |

## Implementation Rule

Do not translate Figma components into one-off page CSS. Use tokens first, then component classes, then Liquid snippets/sections.

```text
Figma component
  -> token role
  -> CSS variable / component class
  -> Liquid snippet or section
  -> Shopify page
```

