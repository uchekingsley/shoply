# Shoply — Colour and UI Design Guidelines

**Product:** Shoply  
**Platforms:** Android and iOS  
**Framework:** React Native with Expo  
**Language:** TypeScript  
**Document status:** Agreed visual direction and design guidance  
**Initial market:** Nigeria  

---

## 1. Purpose

This document defines Shoply's agreed colour direction and the initial rules for applying colour and styling consistently across the customer-facing mobile application.

The goal is to create an interface that feels trustworthy, modern, clean, and commercially credible. Product photography and product information should remain the focus of the shopping experience.

## 2. Agreed Brand Direction

**Selected direction: A — Deep Navy and Vibrant Orange.**

- Deep Navy establishes Shoply's brand identity.
- Vibrant Orange highlights important actions and promotional information.
- White is the dominant background in light mode.
- Light Grey separates secondary sections and grouped content.
- Neutral text colours maintain readability.

Orange must be used selectively. It should not become the background colour for every section or component.

## 3. Core Colour Palette

| Token | Hex | Intended use |
|---|---|---|
| Brand Navy | `#142B4A` | Brand identity, important headings, selected navigation and structural emphasis |
| Action Orange | `#FF7A30` | Primary buttons, key calls to action, promotional highlights and discount emphasis |
| White | `#FFFFFF` | Main light-mode background, cards, sheets and surfaces |
| Light Grey | `#F5F6F8` | Secondary backgrounds, grouped sections and input backgrounds |
| Primary Text | `#202631` | Main body text and product information |
| Secondary Text | `#737B87` | Supporting text, hints, metadata and placeholders |
| Border Grey | `#E5E8ED` | Dividers, subtle outlines and component borders |
| Success Green | `#168653` | Successful operations and positive status indicators |
| Error Red | `#D93636` | Errors, failed states and destructive actions |

These are the agreed starting design tokens. Contrast must be checked during implementation, and a token may need a carefully controlled accessible shade adjustment if a specific text/background pairing does not meet readability requirements.

## 4. Use of White and Backgrounds

White is an intentional and essential part of Shoply's visual identity. It is not merely an unused neutral colour.

### 4.1 Main background

Use `#FFFFFF` as the default background for the main customer-facing screens, including:
- Home.
- Category and product listing screens.
- Search.
- Product details.
- Wishlist.
- Cart.
- Checkout.
- Account and settings.

### 4.2 Secondary background

Use `#F5F6F8` selectively for:
- Search and text-input containers.
- Grouped content areas.
- Secondary information panels.
- Subtle separation between sections.
- Other surfaces where a distinction from the white page background is useful.

Do not wrap every section in a separate card. Preserve whitespace and use background changes only when they improve grouping or comprehension.

### 4.3 Surfaces

Product cards, dialogs, bottom sheets and other elevated surfaces should generally use white in light mode, with a subtle border or restrained elevation where needed.

## 5. Button System

Use four button styles consistently.

### 5.1 Primary button

- Background: Action Orange `#FF7A30`.
- Label: White `#FFFFFF`.
- Use for the most important action on a screen.
- Examples include Add to Cart, Buy Now, Proceed to Checkout, Place Order, Login and Create Account.
- Use a clear pressed state and a visibly disabled state.
- Do not add gradients or decorative effects by default.

### 5.2 Secondary button

- Background: White `#FFFFFF`.
- Label: Brand Navy `#142B4A`.
- Border: Brand Navy or a restrained neutral border, depending on context.
- Use for secondary actions such as Continue Shopping, View Orders and Edit Address.

### 5.3 Text button

- Background: Transparent.
- Label: Brand Navy by default; Action Orange when extra emphasis is appropriate.
- Use for lower-emphasis actions such as See All, View More and Change Address.

### 5.4 Destructive button

- Background: Error Red `#D93636`.
- Label: White `#FFFFFF`.
- Reserve for destructive operations such as deleting an address, deleting a review or removing an account.
- Less serious actions, such as removing an item from the cart, should generally use a subtle icon or text action rather than a large red button.

## 6. Button Dimensions and Shape

Initial design specifications:

| Property | Specification |
|---|---|
| Standard button height | 52 dp |
| Compact button height | 40 dp |
| Border radius | 10 dp |
| Horizontal padding | 20 dp |
| Label size | 15–16 sp |
| Label weight | 600 / semibold |
| Icon-to-label spacing | 8 dp |

Use full-width primary buttons when the action is central to the screen, especially in authentication and checkout. Use compact actions or icon buttons within product cards and dense layouts.

These are starting design measurements. Validate touch targets and layout behaviour on common Android and iOS screen sizes.

## 7. Product Cards and Pricing

Product cards should remain clean and allow the product image to receive the greatest visual attention.

- Use a white surface.
- Use a subtle border or restrained shadow, not both heavily.
- Use approximately 12 dp corner radius.
- Give the product image sufficient space and preserve its aspect ratio.
- Use Primary Text for product names.
- Use Brand Navy for important price emphasis where appropriate.
- Use Action Orange for discount labels and promotional emphasis.
- Use a star icon and readable rating text for ratings.
- Place the wishlist action where it is easy to find without covering important product imagery.

When a product is discounted, show the current price prominently. Show the original price in smaller secondary text with a strikethrough. Never make the entire product card orange.

## 8. Navigation and Headers

### 8.1 Bottom navigation

The agreed visual direction is:
- White background.
- Brand Navy for inactive icons and labels.
- Action Orange for the active destination.
- Subtle top border where needed.
- Consistent icon sizes and label styling.
- A clear cart badge that remains legible and does not obscure the cart icon.

The exact bottom-navigation destinations and labels are not decided in this document.

### 8.2 Headers

Use a white background, Brand Navy text and icons, and a subtle divider only where needed. Do not use a full navy header on every screen; keep the overall application light and spacious.

## 9. Text Inputs and Search Fields

Default input styling:
- Background: Light Grey `#F5F6F8`.
- Text: Primary Text `#202631`.
- Placeholder: Secondary Text `#737B87`.
- Border: Transparent or subtle Border Grey.
- Corner radius: 10 dp.
- Initial height: approximately 48–52 dp.

Focused inputs should have a clear border or focus treatment using Brand Navy. Error inputs should use Error Red and show a short explanatory message. Authentication and checkout fields must have persistent labels; placeholders must not be the only labels.

## 10. Badges and Status Indicators

| Meaning | Colour |
|---|---|
| Successful payment / positive status | Success Green |
| Confirmed order | Success Green |
| Processing | Brand Navy |
| Out for delivery | Action Orange |
| Cancelled | Error Red |
| Failed payment | Error Red |
| Discount / promotion | Action Orange |
| Out of stock | Error Red |
| In stock | Success Green |

Where appropriate, use a pale tinted background with a darker foreground label. Do not rely on colour alone: include text or an icon so that status remains understandable to customers with colour-vision differences.

## 11. Typography

**Recommended typeface: Inter.**

Initial type scale:

| Text role | Size | Weight |
|---|---:|---|
| Screen title | 22–24 sp | 700 / bold |
| Section heading | 18–20 sp | 600 / semibold |
| Product name | 14–16 sp | 500–600 |
| Product price | 17–20 sp | 700 / bold |
| Body text | 14–16 sp | 400 / regular |
| Supporting text | 12–13 sp | 400 / regular |
| Button label | 15–16 sp | 600 / semibold |

Maintain a consistent typographic hierarchy. Avoid using too many font sizes or weights on one screen.

## 12. Spacing and Layout

Use a consistent spacing scale:

| Token | Value |
|---|---:|
| XS | 4 dp |
| SM | 8 dp |
| MD | 12 dp |
| LG | 16 dp |
| XL | 20 dp |
| XXL | 24 dp |
| XXXL | 32 dp |

Maintain consistent horizontal screen padding, align product cards, leave sufficient space between sections, and respect device safe areas. Avoid cramped layouts, especially around product prices and checkout totals.

## 13. Dark Theme

Shoply must support dark theme as well as light theme. Light theme is the default and the primary initial design focus. The application should detect the system theme and provide a manual theme preference in settings.

Suggested dark-theme starting tokens:

| Token | Hex | Intended use |
|---|---|---|
| Dark Background | `#101820` | Main screen background |
| Dark Surface | `#182533` | Cards and standard surfaces |
| Elevated Surface | `#213244` | Elevated panels and dialogs |
| Primary Text | `#FFFFFF` | Main text |
| Secondary Text | `#AAB4C0` | Supporting text |
| Light Brand Accent | `#8FAACB` | Brand-related emphasis where dark surfaces require a lighter treatment |
| Action Orange | `#FF7A30` | Primary actions and promotional emphasis |
| Dark Border | `#344454` | Dividers and outlines |

Do not mechanically invert every light-theme colour. Check contrast and preserve the same visual hierarchy. Orange remains the primary action colour.

## 14. Accessibility and Interaction States

- Maintain readable contrast for text, icons and controls.
- Do not rely on colour alone to communicate selected, unavailable, successful or failed states.
- Provide accessible labels for icon-only buttons.
- Make interactive elements sufficiently large to tap.
- Define default, focused, pressed, disabled, loading and error states where relevant.
- Ensure the design remains usable across supported Android and iOS screen sizes.

## 15. Design Rules

1. White is the dominant light-mode background.
2. Deep Navy establishes Shoply's brand identity.
3. Vibrant Orange is reserved primarily for important actions and promotional highlights.
4. Do not make every component or section orange.
5. Product imagery must have sufficient visual space.
6. Product prices must be easy to identify and compare.
7. Buttons must use consistent styles, dimensions and interaction states.
8. Use red for errors and destructive actions, not ordinary interactions.
9. Maintain readable contrast and accessible controls.
10. Support both light and dark themes through centralized design tokens.
11. Avoid unnecessary gradients, excessive shadows and decorative effects.
12. Keep the overall interface clean, spacious and commercially credible.

## 16. Confirmed Direction vs. Implementation Validation

### Agreed
- Direction A: Deep Navy and Vibrant Orange.
- White as the dominant light-mode background.
- Light Grey as a supporting background.
- Orange for primary actions and promotional emphasis.
- Navy for brand identity and structural emphasis.
- Light and dark theme support.
- Light theme as the default and initial design priority.
- System theme detection and manual theme preference.
- Centralized design tokens.

### To validate during implementation
- Exact contrast ratios for every foreground/background pairing.
- Final font rendering and line heights on Android and iOS.
- Final touch target dimensions.
- Component-specific pressed, loading and disabled states.
- Whether individual token shades need accessible adjustments while preserving the agreed brand direction.
