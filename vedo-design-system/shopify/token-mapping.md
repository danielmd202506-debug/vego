# Shopify Token Mapping

This file maps Figma semantic tokens to Shopify CSS custom properties and theme usage.

## Naming Rule

Use semantic names, not raw color names.

```text
Figma token: color/commerce/cta
CSS variable: --vego-color-commerce-cta
Class usage: .vego-button--primary
```

## Mapping Table

| Component | Figma Token | Shopify CSS Variable | Shopify Boundary |
| --- | --- | --- | --- |
| Button Primary | `color/commerce/cta` | `--vego-color-commerce-cta` | `snippets/vego-button.liquid`, product form |
| Promo Badge | `color/promo/sale` | `--vego-color-promo-sale` | `snippets/vego-badge.liquid`, product card |
| Current Price | `color/commerce/price-current` | `--vego-color-commerce-price-current` | `snippets/vego-price.liquid` |
| Sale Price | `color/commerce/price-sale` | `--vego-color-commerce-price-sale` | `snippets/vego-price.liquid` |
| Product Card | `color/surface/card` | `--vego-color-surface-card` | `snippets/vego-product-card.liquid` |
| Selected Swatch | `color/border/selected` | `--vego-color-border-selected` | variant picker / swatch snippet |

## CSS Output Example

```css
:root {
  --vego-color-commerce-cta: #ffd76a;
  --vego-color-commerce-price-current: #17351f;
  --vego-color-commerce-price-sale: #b25532;
  --vego-radius-control: 4px;
}

.vego-button--primary {
  background: var(--vego-color-commerce-cta);
  border-radius: var(--vego-radius-control);
}
```

## Important Rule

Tokens are not classes.

Tokens define values and meaning. Classes, snippets and sections consume tokens to render Shopify pages.

