# Shoply --- Main Product Requirements Document (PRD)

**Version:** 1.0\
**Status:** Working product specification\
**Product:** Shoply\
**Platforms:** Android and iOS\
**Application framework:** React Native with Expo\
**Language:** TypeScript\
**Initial market:** Nigeria\
**Currency:** Nigerian Naira (₦)\
**Business model:** Single-vendor e-commerce

------------------------------------------------------------------------

## 1. Document Purpose

This document defines the customer-facing product requirements for
Shoply based only on decisions and requirements agreed so far.

It is intended to guide product design, technical planning,
implementation, and testing. It describes what the application must do
and how confirmed features should behave.

**Important scope rule:** This document does not turn undecided ideas
into requirements. Items that have not been agreed are identified as out
of scope for this version or left for a later decision. Recommendations
previously discussed are not treated as confirmed unless explicitly
accepted.

## 2. Product Overview

Shoply is a mobile shopping application for customers in Nigeria.
Customers can discover products across multiple categories, search the
catalogue, view product information and variations, manage a shopping
cart, and proceed toward purchasing products.

Shoply is a **single-vendor** store: - Shoply owns or manages the
product catalogue and inventory. - Customers purchase from Shoply, not
from independent sellers. - Shoply processes customer orders and
coordinates delivery. - Seller registration, seller accounts, and vendor
dashboards are not part of this product scope.

The initial market uses NGN (₦). The architecture should avoid
unnecessarily preventing support for additional markets or currencies in
the future.

## 3. Product Goals

The customer-facing application must: 1. Make it easy to discover and
browse products. 2. Present product information, prices, availability,
and variations clearly. 3. Allow guests to browse and build a cart
without creating an account. 4. Preserve cart contents across app
restarts and synchronize authenticated carts across devices. 5. Handle
product variations as distinct purchasable selections. 6. Revalidate
stock and pricing when relevant cart and purchase operations occur. 7.
Provide a consistent visual experience across the application. 8.
Support light and dark themes. 9. Handle network errors, stale
information, and unavailable products clearly.

## 4. Users and Access

### 4.1 Guest customers

Guests can: - Open and browse the home screen. - Browse product
categories and listings. - Search for products. - View product
details. - Select product variations. - Add products to a locally
persisted cart. - View and manage their cart.

Guests must authenticate before accessing: - Wishlist functionality. -
Checkout completion. - Order history. - Profile management.

### 4.2 Authenticated customers

Authenticated customers can use the guest browsing capabilities and
access the account-dependent features listed above. Their cart must be
stored by the backend and made available across devices.

### 4.3 Authentication transition and cart merge

When a guest signs in or registers: - Preserve the guest cart. - Merge
it with the customer's existing account cart. - Combine quantities only
when the product and selected variation are identical. - Keep different
variations as separate line items. - Revalidate stock and prices. -
Communicate unavailable products and quantity conflicts. - Make the
merge safe to retry so a repeated request does not accidentally
duplicate quantities.

The detailed conflict-resolution policy has not yet been finalized;
implementation must not silently discard cart items or conceal
conflicts.

## 5. Business and Market Requirements

### 5.1 Single-vendor operation

The initial application represents one store. It does not provide a
marketplace for third-party sellers.

### 5.2 Initial market

-   Currency: Nigerian Naira (₦).
-   Phone-number handling must support the Nigerian +234 convention.
-   Delivery addresses must accommodate Nigerian states, cities or local
    government areas, street addresses, house/building details, and
    landmarks.
-   Do not assume every Nigerian address has a standard postal code.
-   Avoid hardcoding market-specific assumptions throughout the
    application where a configurable approach is practical.

## 6. Visual Identity and Design System

Shoply uses the **Deep Navy + Vibrant Orange** direction.

### 6.1 Brand palette

  -----------------------------------------------------------------------
  Token                   Hex                     Intended use
  ----------------------- ----------------------- -----------------------
  Deep Navy               `#142B4A`               Brand colour, important
                                                  structural elements,
                                                  headings and selected
                                                  navigation states

  Vibrant Orange          `#FF7A30`               Primary actions and
                                                  promotional emphasis

  White                   `#FFFFFF`               Dominant light-mode
                                                  background and clean
                                                  surfaces

  Light Grey              `#F5F6F8`               Secondary surfaces and
                                                  grouped content

  Dark Text               `#202631`               Main text

  Secondary Grey          `#737B87`               Supporting text and
                                                  placeholders

  Border Grey             `#E5E8ED`               Borders and dividers

  Success Green           `#168653`               Successful states

  Error Red               `#D93636`               Error and destructive
                                                  states
  -----------------------------------------------------------------------

White is intentionally a major part of the design. In light mode, it
should remain the dominant background. Navy establishes the brand;
orange draws attention to important actions. Orange must not be used as
the background for every section or component.

### 6.2 Button system

Use consistent button styles throughout the application.

**Primary button** - Orange background (`#FF7A30`). - White text
(`#FFFFFF`). - Used for the main action on a screen, such as Add to
Cart, Buy Now, Proceed to Checkout, and other confirmed primary
actions. - Provide clear pressed, loading, and disabled states.

**Secondary button** - White background. - Navy text and navy border. -
Used for secondary actions.

**Text button** - Transparent background. - Navy text by default; orange
may be used when additional emphasis is needed. - Used for
lower-emphasis actions such as navigation or "See All".

**Destructive button** - Red background with white text when a prominent
destructive action is necessary. - Less prominent destructive actions,
such as removing a cart item, should use a restrained text or icon
treatment rather than a large red button.

Initial design measurements: - Standard button height: 52. - Compact
button height: 40. - Border radius: 10. - Horizontal padding: 20. -
Button text: 15--16, weight 600. - Icon-to-label spacing: 8.

These are design specifications to validate on actual devices during
implementation.

### 6.3 Product cards

Product cards should: - Use a white surface in light mode. - Use a
subtle border or restrained shadow. - Have approximately 12 corner
radius. - Give the product image the largest visual area. - Show product
name, current price, and rating where available. - Show original price
with a strikethrough when a valid discount applies. - Use orange for
discount emphasis, not as the entire card background. - Include a
wishlist action for authenticated customers; guests must be prompted to
authenticate when they attempt to use wishlist functionality.

### 6.4 Navigation and headers

The agreed visual treatment is: - White header and bottom-navigation
surfaces in light mode. - Navy text and icons for inactive navigation
items. - Orange emphasis for the active navigation item. - A subtle
divider where needed. - Avoid using a full navy header on every screen;
keep the interface predominantly light.

The exact bottom-navigation destinations and order have not been
confirmed and must not be treated as final.

### 6.5 Inputs

Initial input treatment: - Light-grey background (`#F5F6F8`). - Dark
text. - Secondary-grey placeholder. - Subtle or transparent default
border. - Approximately 10 corner radius and 48--52 height. - Navy
border or clear navy focus treatment. - Red border and explanatory
message for validation errors. - Use persistent labels for important
authentication and checkout fields rather than relying only on
placeholders.

### 6.6 Typography and layout

-   Recommended typeface: Inter.
-   Screen title: 22--24, weight 700.
-   Section heading: 18--20, weight 600.
-   Body text: 14--16, regular.
-   Supporting text: 12--13, regular.
-   Product price: 17--20, weight 700.
-   Use a consistent spacing scale: 4, 8, 12, 16, 20, 24, and 32.
-   Respect device safe areas and maintain consistent horizontal screen
    padding.
-   Keep product images, prices, and checkout information easy to scan.

### 6.7 Status colours

Use green for success, red for errors or unavailable states, navy for
neutral structural states, and orange for attention or delivery-progress
emphasis. Prefer lightly tinted backgrounds with readable foreground
text.

### 6.8 Themes

Confirmed: - Support light and dark themes. - Light theme is the default
and initial design priority. - Detect the device's system theme. - Allow
the customer to select a theme manually in settings. - Centralize
colour, typography, spacing, and shape tokens.

Dark mode must use a deliberately designed palette rather than
mechanically inverting light-mode colours. The proposed dark palette is
a starting point and must be checked for contrast during implementation.

## 7. Home Screen

The agreed home-screen component order is:

1.  Delivery location selector.
2.  Search bar.
3.  Promotional banner carousel.
4.  Product categories.
5.  Flash deals.
6.  Best sellers.
7.  Recommended products.
8.  Recently viewed products.
9.  Bottom navigation.

### 7.1 Delivery location selector

-   Display the currently selected delivery location.
-   Allow the customer to change the selected location.
-   Allow selection of a saved address where available.
-   Allow the customer to add a new address.
-   Refresh relevant delivery information when the selected location
    changes.
-   Guests may select a delivery location.

### 7.2 Search entry point

-   Provide a visible search field.
-   Allow customers to enter product search terms.
-   Selecting the field opens or activates the search experience.
-   Search behaviour beyond the requirements explicitly recorded in this
    PRD remains to be decided.

### 7.3 Promotional banner carousel

-   Display multiple promotional banners.
-   Support manual swiping.
-   Support automatic movement.
-   Display position indicators.
-   Allow a banner to be clickable and navigate to its configured
    destination.
-   Banner content and destinations must be supplied by the product
    system rather than hardcoded into the app.

### 7.4 Categories

Initial categories: - Electronics - Fashion - Phones & Accessories -
Home & Kitchen - Beauty & Personal Care - Groceries

Display category names and suitable images or icons. Selecting a
category opens its product listing. The category structure should allow
future additions.

### 7.5 Flash deals, best sellers and recommendations

-   Flash deals display products with active offers.
-   Best sellers are selected using backend sales data.
-   Recommended products are supplied by the product system.
-   Product cards display relevant product imagery, name, price,
    discount information where applicable, and rating where available.
-   The detailed ranking algorithms and personalization rules are not
    yet decided.

### 7.6 Recently viewed

-   Display products the customer has previously opened.
-   Avoid duplicate entries.
-   Prioritize recently viewed products.
-   Persist guest recently viewed data locally.
-   Selecting an item returns to its product details page.
-   The exact retention limit and authenticated synchronization policy
    remain to be decided.

## 8. Product Categories and Listings

Selecting a category opens a product listing for that category.

Product listings must: - Identify the selected category. - Display
products in a consistent grid or listing layout. - Use consistent
product cards. - Allow a customer to open a product details page. -
Support progressive loading or pagination so the entire catalogue is not
fetched at once. - Display loading, empty, and error states. - Avoid
duplicate products when additional pages are loaded.

Category-specific filters and sorting options have been discussed as
possibilities but have not been finalized. Do not implement a fixed set
of filters as a confirmed product requirement until those decisions are
made.

## 9. Product Details

The product details screen must present the information needed to
understand and select a product.

### 9.1 Screen content order

1.  Header with back, wishlist, and share actions.
2.  Swipeable product image gallery.
3.  Product name.
4.  Average rating and review count.
5.  Current price and original price where applicable.
6.  Availability.
7.  Product variations.
8.  Quantity selector.
9.  Description.
10. Specifications.
11. Delivery information.
12. Customer reviews.
13. Related products.
14. Persistent Add to Cart and Buy Now actions.

### 9.2 Images

-   Allow customers to swipe through product images.
-   Show an image-position indicator.
-   Preserve image aspect ratio.
-   Display a placeholder if an image is unavailable.
-   Support multiple images for a product.

### 9.3 Pricing and availability

-   Display prices in NGN.
-   Show an original price and discount only when the backend supplies
    valid promotional pricing.
-   The backend is authoritative for product prices, discounts, and
    stock.
-   The app must not rely on stale client-side values to authorize a
    purchase.

Availability states: - In stock: purchasing is enabled. - Low stock:
show a limited-stock message only when the backend provides reliable
information. - Out of stock: disable purchasing for the selected
variation. - Discontinued: show the product as unavailable.

Availability may differ by variation.

### 9.4 Variations

A product may have category-specific variations. Examples already agreed
include: - Fashion: size and colour. - Phones: storage capacity and
colour. - Electronics: model, capacity, or configuration.

The screen must display the variations supplied for the product, require
selection of mandatory variations, and reflect the availability of the
selected variation.

Each distinct product-and-variation combination is a separate cart line
item. The selected variation must be identifiable by a stable SKU or
equivalent backend identifier.

### 9.5 Quantity

-   Provide controls to increase and decrease quantity.
-   Prevent zero or negative quantities.
-   Respect stock and any purchase limits supplied by the backend.
-   Explain when a requested quantity cannot be selected.

### 9.6 Description and specifications

-   Display the product description in a readable format.
-   Display structured specifications when supplied.
-   Do not show an empty specifications section when no specifications
    exist.

### 9.7 Delivery information

Show delivery information supplied by the delivery or backend system.
This may include an estimated window, delivery fee, or a note that the
fee will be calculated after an address is selected. Do not display
unverified delivery guarantees.

### 9.8 Add to Cart

When Add to Cart is selected: 1. Validate mandatory variation
selections. 2. Validate the requested quantity. 3. Submit the product
and selected variation identifier with the quantity. 4. Show clear
success or failure feedback. 5. Keep the customer on the product details
screen.

Adding an item to the cart does **not** reserve or lock inventory.

### 9.9 Buy Now

-   Validate mandatory variations and quantity.
-   Start checkout for the selected item.
-   If the customer is a guest, require authentication before checkout
    completion.
-   Preserve the intended purchase through authentication.

### 9.10 Wishlist and related products

Wishlist requires authentication. Related products are supplied by the
product system. The precise recommendation and ranking rules remain
undecided.

## 10. Shopping Cart

### 10.1 Cart line identity

Each cart line represents one product and one selected variation.

Example: - Black T-shirt, Medium --- quantity 1. - White T-shirt, Large
--- quantity 2.

These are separate lines. Adding another unit of the exact same product
variation increases the quantity of the existing line.

### 10.2 Cart item information

Each line should display: - Product image. - Product name. - Selected
variation details. - Unit price. - Quantity. - Line subtotal. - Remove
action. - Relevant availability information.

### 10.3 Quantity and removal

Customers can increase or decrease quantities and remove individual
items. The app must prevent invalid quantities and communicate stock
restrictions.

### 10.4 Cart persistence

**Guest cart** - Store locally on the device. - Preserve contents after
the app is closed and reopened. - Do not rely solely on in-memory state.

**Authenticated cart** - Persist in the backend. - Make the cart
available across devices.

### 10.5 Inventory

Adding an item to the cart does not reserve inventory. Other customers
may purchase the stock before the current customer checks out.

Revalidate stock: - When cart quantities are changed. - During checkout
before order submission.

If an item or variation becomes unavailable, notify the customer and
provide a clear way to resolve the cart.

### 10.6 Pricing

The backend is authoritative for prices, discounts, promotion validity,
delivery fees, and order totals. Refresh or revalidate values when
necessary. If a price changes, tell the customer and require the
applicable confirmation before the order is placed.

### 10.7 Cart merging

After guest authentication: - Merge guest and account cart contents. -
Combine quantities for identical product-and-variation combinations. -
Keep different variations separate. - Revalidate prices and stock. -
Communicate unavailable items and quantity conflicts. - Ensure retrying
the merge does not accidentally duplicate quantities.

### 10.8 Cart summary and promotions

A cart summary should be able to represent subtotal, discount, delivery
fee when known, and total or estimated total. Delivery fees may be
calculated after the customer selects an address.

Promo-code entry and validation have been discussed, but the complete
promotion rules---including stacking, eligibility, and conflict
handling---have not been finalized. They must not be invented in
implementation.

The exact cart badge counting convention and whether a clear-cart action
is included in the initial release remain undecided.

## 11. Cross-Screen Behaviour and Reliability

### 11.1 Loading

Screens that retrieve remote data must show an appropriate loading state
rather than remaining blank.

### 11.2 Empty states

Provide clear empty states for confirmed customer-facing areas where an
empty result is possible, including an empty cart, no recently viewed
products, and empty product listings.

### 11.3 Error handling

Handle: - No internet connection. - Slow network and request timeout. -
Server errors. - Expired authentication. - Failed cart updates. -
Unavailable products or variations. - Stale prices and stock. - Failed
cart merge.

Messages should be understandable to customers and should offer a
recovery action when one is available. Do not expose raw server errors
or stack traces.

### 11.4 Data authority

The backend is authoritative for: - Product prices. - Discounts and
promotion validity. - Inventory and availability. - Delivery fees. -
Order totals.

The client may display cached information for responsiveness, but it
must not treat cached values as final authorization to purchase.

## 12. Confirmed Product Rules

The following rules must be preserved throughout design and
implementation:

1.  Shoply is single-vendor, not a multi-vendor marketplace.
2.  Guests can browse, search, view product details, select variations,
    and manage a cart.
3.  Wishlist, checkout completion, order history, and profile management
    require authentication.
4.  The initial market is Nigeria and the currency is NGN.
5.  Planned payment methods are card, bank transfer, and Cash on
    Delivery; the payment provider has not been selected.
6.  Delivery is intended to support both in-house personnel and
    third-party logistics providers.
7.  Light and dark themes are required; light is the default.
8.  Only verified purchasers may review products.
9.  Reviews use a 1--5 star rating and written text; customer
    photo/video uploads are excluded from the agreed review scope.
10. Different variations of one product are separate cart lines.
11. Adding to cart does not reserve inventory.
12. Guest carts persist locally; authenticated carts persist in the
    backend across devices.
13. Guest and account carts merge on authentication, with stock and
    price revalidation.
14. The visual identity is Deep Navy `#142B4A`, Vibrant Orange
    `#FF7A30`, and a predominantly white light-mode interface.

## 13. Explicitly Not Finalized

The following subjects have been discussed but are not confirmed
requirements in this PRD:

-   Exact bottom-navigation tabs, labels, and order.
-   Authentication methods and verification details.
-   Search suggestions, filters, sorting, and search-history
    synchronization.
-   Wishlist structure (one list or multiple lists).
-   Full checkout sequence and detailed validation rules.
-   Specific payment provider and provider-specific payment behaviour.
-   COD eligibility and operational rules.
-   Exact delivery fee calculation and delivery estimate rules.
-   Order status lifecycle, cancellation eligibility, and refund rules.
-   Exact live-tracking capabilities.
-   Notification types, preferences, and push-notification behaviour.
-   Customer-support channels.
-   Backend technology, database, and API design.
-   Admin dashboard and operational workflows.
-   Detailed promotional rules and recommendation algorithms.
-   Cart badge counting convention and clear-cart behaviour.
-   Exact cart-merge conflict resolution.
-   Account deletion and other account lifecycle rules.

These items should be resolved through separate product decisions before
being added to the confirmed requirements.

## 14. Product Documentation References

The following documents provide more focused detail and should be
maintained alongside this main PRD:

-   **Shoply Colour & UI Design Guidelines** --- brand palette, buttons,
    typography, spacing, surfaces, and theme rules.
-   **Shoply Home Screen Requirements** --- detailed home-screen
    structure and component behaviour.
-   **Shoply Product Details Page Requirements** --- product
    information, variations, availability, and purchase actions.
-   **Shoply Shopping Cart Requirements** --- cart line items,
    persistence, merging, stock validation, and cart behaviour.

Where a focused document adds detail, it should remain consistent with
the confirmed rules in this main PRD.

## 15. Completion Standard for This Specification

This PRD records the customer-facing requirements agreed so far. It is
not a claim that every customer-facing feature has been fully specified.
The unresolved items in Section 13 must be decided before their detailed
behaviour is treated as final.

Implementation should proceed from confirmed requirements, and new
decisions should be added with an explicit status so that proposed ideas
are never mistaken for approved product behaviour.
