# DS QA Checklist

Use this before a DS change is released from Shopify preview to production.

## Required Checks

- [ ] Figma component or variable is updated.
- [ ] GitHub PR includes token/CSS/Liquid change.
- [ ] Notion decision record exists.
- [ ] Notion version note exists.
- [ ] Shopify preview theme renders correctly.
- [ ] Mobile layout is checked.
- [ ] Product card CTA is visible and not overlapped.
- [ ] Price, compare-at price and sale badge are semantically separated.
- [ ] Promo colors are not reused for primary commerce decisions unless approved.
- [ ] Button text contrast passes visual review.
- [ ] Operations settings do not expose unrestricted styling control.

## High-Risk Pages

- PDP
- Collection grid
- Cart drawer/page
- Search results
- Homepage product modules

## Release Evidence

Record these in Notion:

- GitHub PR link
- Shopify preview theme link
- screenshots or QA notes
- release owner
- approval date

