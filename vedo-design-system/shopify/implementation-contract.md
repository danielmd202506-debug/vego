# Shopify Implementation Contract

Chinese term: `Shopify 实现约定`

This is not a legal contract. It is the implementation agreement between design, engineering, operations and Shopify theme code.

## What It Controls

- Which tokens can be used by each component.
- Which Shopify snippets own each reusable UI element.
- Which sections are page-level patterns.
- Which theme settings can be edited by operations.
- Which values should remain code-owned.

## Recommended Shopify Files

```text
assets/
  vego-tokens.css
  vego-components.css

snippets/
  vego-button.liquid
  vego-badge.liquid
  vego-price.liquid
  vego-product-card.liquid
  vego-swatch.liquid

sections/
  main-product.liquid
  collection-product-grid.liquid
  vego-featured-collection.liquid

config/
  settings_schema.json
```

## Ownership Rule

| Layer | Owner | Editable In Shopify Admin |
| --- | --- | --- |
| Brand tokens | Design + Dev | No |
| Commerce tokens | Design + Dev + PM | No |
| Promo copy/media | Ops + PM | Yes, with whitelist |
| Product data | Shopify product model | Yes |
| Component structure | Dev | No |

