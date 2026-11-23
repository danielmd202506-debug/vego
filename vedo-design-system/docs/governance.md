# DS Governance

## Operating Model

VEGO DS uses three sources:

- Figma: design source
- GitHub: engineering source
- Notion: decision and version source

Shopify preview theme is the release validation environment.

## Change Flow

1. Request
   - Design, PM, Ops or Dev proposes a change.
2. Decision
   - Notion records rationale, owner, risk and target version.
3. Build
   - Figma updates design assets.
   - GitHub updates tokens, CSS, Liquid or docs.
4. QA
   - Shopify preview theme is checked on desktop and mobile.
5. Release
   - GitHub PR is merged.
   - Notion release note is updated.

## Version Labels

| Version | Meaning | Exit Criteria |
| --- | --- | --- |
| v0.1 | Current audit | Current foundations and component scope documented |
| v0.2 | Token baseline | Token names and values are stable enough for Shopify preview |
| v0.3 | Component baseline | Core commerce components have Figma and Shopify mapping |
| v0.4 | Shopify preview | Token bridge and core snippets run in preview theme |
| v1.0 | Production ready | Core pages pass QA and release note is approved |

