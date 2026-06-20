# VEGO Design System Decision Log

This document records the major design-system decisions made during the Foundation v1 setup.

## Decision 1: Use The Live VEGO Website As The Initialization Baseline

**Decision:** Foundation v1 should match the current live VEGO Shopify website before proposing a visual refresh.

**Reason:** The first goal is to stabilize and document the existing system. Changing brand color, typography, or component behavior too early would mix systemization with redesign and create avoidable business risk.

**Impact:**

- Current colors are captured from the existing website direction.
- Optimization suggestions can be documented, but they are not the default v1 values.
- Any future visual refresh should be a separate approved version.

## Decision 2: Design System Has Two Primary Users

**Decision:** The DS must serve both designers and developers.

**Designer path:**

- Use Figma variables/tokens.
- Use component variants.
- Compose pages from approved components.
- Follow usage SOP and guardrails.

**Developer path:**

- Use token source files.
- Use CSS custom properties.
- Map components to Shopify Liquid snippets and sections.
- Keep implementation reviewable in GitHub.

**Impact:** Figma alone is not enough. GitHub must hold the engineering source that Shopify can execute and reviewers can inspect.

## Decision 3: Separate Brand, Guidance, And Commerce Layers

**Decision:** The DS should preserve a fixed relationship between brand, guidance, and commerce layers.

**Brand layer owns:**

- Recognition
- Campaign tone
- Editorial imagery
- Large brand moments

**Guidance layer owns:**

- Help Me Choose
- Fit explanations
- Scenario filters
- Comparison and education

**Commerce layer owns:**

- Price
- Sale state
- Add to Cart
- Product card purchase path
- Cart and checkout-adjacent UI

**Reason:** Purchase-critical UI must remain stable. Brand and campaign content can change more often, but it should not steal priority from commerce actions.

## Decision 4: Token Is A Named Design Decision, Not Just A CSS Class

**Decision:** Design tokens should describe reusable roles and values. CSS variables and classes are implementation mechanisms.

**Example:**

```text
Token: color/commerce/cta
CSS variable: --vego-color-commerce-cta
Class: .vego-button--primary
Liquid usage: snippets/vego-button.liquid
```

**Impact:** Designers and developers share one naming language, while Shopify remains free to implement through CSS, Liquid, and theme settings.

## Decision 5: Use Role-Based Token Naming

**Decision:** Token names should be role-based, not purely numeric or decorative.

**Examples:**

- `color/commerce/cta`
- `color/promo/sale`
- `color/text/price`
- `shadow/card`
- `shadow/popover`
- `shadow/drawer`

**Reason:** Numeric scales such as 100/200/300 are useful for palettes, but ecommerce implementation needs semantic roles so teams know where a value is allowed.

**Impact:** A color can still have a palette value, but components should consume role tokens.

## Decision 6: Shopify Theme Settings Should Be Guardrailed

**Decision:** Shopify theme settings may expose content, media, copy, campaign assets, and selected safe token choices. Core hierarchy and behavior should stay code-owned.

**Can be editable by operations:**

- Promo copy
- Campaign media
- Selected approved badge tone
- Section content

**Should stay code-owned:**

- CTA hierarchy
- Price behavior
- Product card structure
- Cart behavior
- Typography roles
- Spacing rules

**Reason:** Overexposing theme settings can create inconsistent pages and damage purchase flows.

## Decision 7: Use "Implementation" Instead Of Literal "Contract"

**Decision:** In user-facing DS documentation, use clearer labels such as:

- `Figma Usage / 设计师怎么用`
- `Design Tokens / 样式从哪里来`
- `Shopify Implementation / 开发怎么落地`

**Reason:** "Contract" was too abstract and sounded like legal wording in Chinese. "Implementation" better explains the bridge between design and code.

## Decision 8: Logo Assets Belong In The DS

**Decision:** The DS should include current VEGO logo assets and usage guidance.

**Reason:** Designers should not recreate the logo with text or temporary marks. Developers need stable logo files and dimensions.

**Impact:** Logo assets are now included under `assets/vego-logos/` and the DS release package includes selected copies under `vego-design-system-foundation-v1/assets/logos/`.

## Decision 9: Component Pages Must Show The Corresponding Component

**Decision:** Component documentation should not only describe variants, tokens, and implementation notes. It should show the matching component preview next to the explanation.

**Reason:** Designers and stakeholders need to see what the state actually looks like. Abstract tables are not enough.

**Impact:** The Modal/Dialog page was revised toward variant blocks that combine component preview, Figma usage, token mapping, and Shopify implementation.

## Decision 10: GitHub Stores Engineering Source, Not Design Files

**Decision:** GitHub should store the files that can be executed, reviewed, versioned, or handed to developers.

**Included:**

- Token source
- CSS variables
- Component implementation notes
- Shopify mapping
- QA checklist
- Demo HTML
- Changelog

**Not included as primary source:**

- Figma design canvas
- Unstructured chat history
- Temporary export files

