# VEGO Button Dictionary

Date: 2026-06-24

Purpose: align business, design, and product language used in the VEGO button spec work.

Use this dictionary when discussing button rules, Figma components, page audits, and design-system naming.

## 1. Business Vocabulary

| Term | Read aloud | 中文解释 | VEGO 场景 |
| --- | --- | --- | --- |
| CTA | see-tee-ay | Call to Action，行动召唤。引导用户做下一步动作的入口。 | `Add to Cart`, `Shop All`, `Get $10 Off` |
| Purchase | pur-chase | 购买动作。用户把商品加入购物车或进入购买流程。 | `Add to Cart`, `Buy Now`, `Pre-order` |
| Purchase / Card | pur-chase card | 商品卡上的购买按钮。 | PLP、推荐商品卡里的 `Add to Cart` |
| Purchase / PDP Main | pur-chase pee-dee-pee main | PDP 主购买区的购买按钮。 | PDP 首屏主商品 `Add to Cart` |
| Purchase / Sticky | pur-chase sticky | 滚动后固定在页面底部的购买工具栏。 | PDP desktop bottom sticky toolbar |
| Purchase / Compact | pur-chase compact | 紧凑购买按钮。用于空间较小的商品模块。 | add-ons、comparison table |
| Add to Cart | add to cart | 加入购物车。典型购买动作。 | PLP、PDP、推荐商品 |
| Buy Now | buy now | 立即购买。比 Add to Cart 更直接进入结账。 | PDP 或 checkout entry |
| Pre-order | pre-order | 预购。用户可以购买，但商品不是即时发货。 | 商品卡、PDP、库存状态 |
| Out of Stock / OOS | out of stock / oh-oh-ess | 缺货。商品当前不可购买。 | 商品卡、PDP |
| Notify Me | notify me | 到货提醒。缺货时让用户留下通知意图。 | OOS 商品 |
| Inventory | in-ven-tory | 库存语义。表达现货、缺货、预购、不可用。 | `In Stock`, `OOS`, `Pre-order` |
| Discovery | dis-cov-er-y | 导购 / 发现。帮助用户进入合适的商品路径。 | `Help Me Choose`, `Design Your Garden` |
| Promo | pro-mo | 促销。和 sale、campaign、discount 相关的商业入口。 | `4th of July Sale`, `Prime Day` |
| Campaign | cam-paign | 活动专题。围绕某个促销或主题建立的页面/模块。 | sale landing, Prime Day page |
| Sale | sale | 折扣 / 促销状态。 | sale banner, sale collection |
| Form | form | 表单。用户提交邮箱、申请、反馈等信息。 | newsletter, application |
| Program | pro-gram | 品牌项目或社区项目。 | loyalty program, partner program |
| Newsletter | news-letter | 邮件订阅。 | `Get $10 Off` |
| Loyalty Program | loy-al-ty program | 会员/积分/忠诚度项目。 | header/footer link |
| Landing Page | landing page | 落地页。用户进入某个主题、活动或品牌叙事的页面。 | Home, campaign landing |
| Home Page | home page | 首页。品牌与购物路径的入口。 | VEGO home |
| Collection | col-lec-tion | 集合页。Shopify 常用概念，一组商品或分类集合。 | Raised Garden Beds collection |
| PLP | pee-el-pee | Product Listing Page，商品列表页。 | category product grid |
| PDP | pee-dee-pee | Product Detail Page，商品详情页。 | 9-in-1 raised garden bed page |
| Cart | cart | 购物车。保存用户准备购买的商品。 | cart icon, cart drawer |
| Checkout | check-out | 结账流程。 | checkout button |
| Add-ons | add-ons | 加购商品 / 配件。 | PDP add-on module |
| Recommendation | rec-om-men-da-tion | 推荐商品。 | You May Also Like |
| Cross-sell | cross-sell | 交叉销售。推荐相关商品促进加购。 | PDP add-ons |
| Up-sell | up-sell | 向上销售。推荐更高规格或更高价值选择。 | PDP comparison |
| Support | sup-port | 支持/帮助内容。 | FAQ, manual, contact |
| User Manual | user manual | 用户手册。通常应该是 document link。 | PDP manual |
| FAQ | ef-ay-cue | 常见问题。 | FAQ accordion, support page |

## 2. Design Vocabulary

| Term | Read aloud | 中文解释 | VEGO button 用法 |
| --- | --- | --- | --- |
| Button | but-ton | 按钮。执行动作、提交、购买、打开面板或改变状态。 | `Add to Cart`, `Filter`, `Submit` |
| Text Link | text link | 文本链接。主要用于跳转到内容、说明、政策、手册。 | `Learn More`, `User Manual`, `View More` |
| Button-like Link | button-like link | 看起来像按钮、实际是链接的跳转入口。 | `Shop All Products`, hero CTA |
| Icon Button | icon button | 只有图标或图标为主的按钮。 | Search, Cart, Menu, Close |
| Card Link | card link | 整张卡片或卡片局部可点击。 | product card, category card |
| Primary | pri-ma-ry | 最高强调级别。不是所有重要按钮都应该叫 Primary。 | 在 VEGO 中应被 role-based 规则替代 |
| Secondary | sec-on-da-ry | 次级按钮。强调低于 primary。 | discovery 或低优先级动作 |
| Tertiary | ter-shee-air-y | 第三级操作。通常接近 text link。 | content action, quiet action |
| Ghost | ghost | 无填充或非常弱背景的按钮。 | utility 或低强调动作 |
| Destructive | de-struc-tive | 破坏性操作。用于删除、移除、取消等风险动作。 | cart remove, account delete |
| Variant | var-i-ant | 组件变体。一个组件在不同角色/状态/尺寸下的版本。 | Purchase/Card, Purchase/Sticky |
| State | state | 状态。组件在不同交互或业务情境下的表现。 | hover, focused, loading, OOS |
| Default | de-fault | 默认状态。没有 hover/pressed/focus 的普通状态。 | 所有按钮 |
| Hover | hov-er | 鼠标悬停状态。 | desktop pointer interaction |
| Pressed | pressed | 按下状态。 | button click feedback |
| Focused | fo-cused | 键盘焦点状态。 | accessibility focus ring |
| Disabled | dis-a-bled | 禁用状态。不可点击。 | unavailable UI action |
| Loading | load-ing | 加载中。动作提交后等待结果。 | Add to Cart, submit |
| Success | suc-cess | 成功状态。 | Added to cart |
| Error | er-ror | 错误状态。 | submit failed, add failed |
| Selected | se-lect-ed | 已选中。持续状态，不等于 hover。 | swatch, choice, filter chip |
| Active / Open | ac-tive / open | 激活或展开状态。 | menu open, filter drawer open |
| Unavailable | un-a-vail-a-ble | 当前不可选，但原因可能由变体组合决定。 | unavailable color/size |
| Focus Ring | focus ring | 焦点环。键盘访问时显示的外框。 | must be separate from brand color |
| Token | to-ken | 设计变量。把颜色、尺寸、圆角等抽象成可复用值。 | `action.purchase.bg.default` |
| Semantic Token | se-man-tic token | 语义 token。按用途命名，而不是按颜色命名。 | `action.purchase.bg` |
| Primitive Token | prim-i-tive token | 基础 token。通常是原始颜色或尺寸。 | `green-700`, `yellow-400` |
| Role | role | 角色。表示按钮的业务职责。 | purchase, promo, utility |
| Context | con-text | 场景/上下文。表示按钮出现在哪类页面或模块中。 | PDP main, sticky, card |
| Emphasis | em-pha-sis | 强调级别。决定视觉权重。 | primary, secondary, tertiary |
| Size | size | 尺寸。按钮高度、宽度、padding 等。 | lg, md, sm, compact |
| Hit Area | hit area | 可点击区域。尤其移动端不能太小。 | icon button, compact button |
| Swatch | swatch | 色板/颜色选择器。 | product color selection |
| Chip | chip | 小标签式选择项。 | category chip, filter chip |
| Choice Button | choice button | 选择型按钮。用于选尺寸、配置、选项。 | `17" Tall`, `9-in-1` |
| Stepper | step-per | 数量步进器。通常有减号、数量、加号。 | PDP quantity |
| Dropdown | drop-down | 下拉菜单。 | sort, variant selector |
| Drawer | draw-er | 抽屉式面板。 | mobile filter, cart drawer |
| Modal | mo-dal | 弹窗。阻断当前页面，需要用户处理。 | signup modal |
| Accordion | ac-cor-di-on | 折叠面板。 | FAQ |
| Carousel | car-ou-sel | 轮播。 | product recommendations |
| Banner | ban-ner | 横幅。 | promo bar, campaign banner |
| Hero | he-ro | 首屏主视觉模块。 | home hero, campaign hero |
| Header | head-er | 页面顶部导航区域。 | global nav |
| Footer | foot-er | 页面底部信息区。 | footer links, newsletter |
| Mega Menu | mega menu | 大型下拉导航菜单。 | category navigation |
| Filter | fil-ter | 筛选。帮助用户缩小商品范围。 | PLP filter |
| Sort | sort | 排序。改变商品列表顺序。 | PLP sort |
| Submit | sub-mit | 提交。 | form CTA |
| Inverse | in-verse | 反色样式。通常用于深色/绿色背景上。 | footer text link, cream button |
| Accessibility / A11y | access-i-bility / ay-eleven-why | 可访问性。保证键盘、读屏等用户能使用。 | focus ring, aria-label |
| Aria Label | aria label | 给读屏器识别的标签。icon-only 按钮必须有。 | search icon, cart icon |

## 3. VEGO-Specific Naming

| Name | Read aloud | 中文解释 |
| --- | --- | --- |
| `Button / Purchase / Card` | button purchase card | 商品卡购买按钮 |
| `Button / Purchase / PDP` | button purchase pee-dee-pee | PDP 主购买按钮 |
| `Button / Purchase / Sticky` | button purchase sticky | PDP 滚动后底部固定购买按钮 |
| `Button / Purchase / Compact` | button purchase compact | 紧凑购买按钮 |
| `Button / Purchase / Preorder` | button purchase preorder | 预购购买按钮 |
| `Button / Discovery` | button discovery | 导购按钮 |
| `Button / Promo` | button promo | 促销按钮 |
| `Button / Form` | button form | 表单提交按钮 |
| `Button / Icon` | button icon | 图标按钮 |
| `Button / Choice` | button choice | 选择按钮 |
| `Button / Swatch` | button swatch | 色板按钮 |
| `TextLink / Default` | text link default | 默认文本链接 |
| `TextLink / Inverse` | text link inverse | 反色文本链接 |
| `TextLink / Arrow` | text link arrow | 带箭头文本链接 |
| `TextLink / Document` | text link document | 文档/手册链接 |
| `CardLink / Product` | card link product | 商品卡链接 |
| `CardLink / Category` | card link category | 分类卡链接 |

## 4. Common Confusions

| Confusing pair | Difference |
| --- | --- |
| CTA vs Button | CTA 是行动目的；Button 是组件形态。CTA 可以是 button，也可以是 button-like link 或 text link。 |
| Purchase vs Primary | Purchase 是业务角色；Primary 是视觉强调级别。购买按钮不应该只靠 Primary 命名。 |
| Disabled vs Out of Stock | Disabled 是 UI 状态；Out of Stock 是库存业务状态。 |
| Hover vs Selected | Hover 是临时悬停；Selected 是持续选中。 |
| Text Link vs Ghost Button | Text link 是导航/内容跳转；Ghost button 仍然是按钮式操作。 |
| Promo vs Destructive | Promo 是促销语义；Destructive 是危险操作语义。红色不能同时混用。 |
| PDP Main vs PDP Sticky | PDP Main 是主购买区；PDP Sticky 是滚动后的固定工具栏。 |
| Card Link vs Product Card Button | Card link 进入商品详情；product card button 执行 Add to Cart。 |
