# Shoply --- Home Screen Requirements

## Document purpose

This document records the home-screen elements and related product
decisions agreed for the Shoply e-commerce mobile application. It is a
focused home-screen specification with the relevant customer-experience
decisions captured so far.

## Product context

-   **Product:** Shoply
-   **Platform:** Android and iOS
-   **Framework:** React Native with Expo
-   **Language:** TypeScript
-   **Business model:** Single-vendor e-commerce
-   **Initial market:** Nigeria
-   **Currency:** Nigerian Naira (₦)

## Home-screen structure

The home screen will contain the following elements, in this order:

1.  **Delivery location selector**
    -   Displays the customer's current or selected delivery address.
    -   Allows the customer to change the delivery location.
2.  **Search bar**
    -   Gives customers a prominent way to search the product catalogue.
3.  **Promotional banner carousel**
    -   Displays promotional campaigns and featured offers.
    -   Supports multiple banners that customers can browse.
4.  **Product categories**
    -   Provides entry points into the store's product categories.
    -   Initial categories agreed:
        -   Electronics
        -   Fashion
        -   Phones & Accessories
        -   Home & Kitchen
        -   Beauty & Personal Care
        -   Groceries
5.  **Flash deals**
    -   Highlights time-sensitive or limited promotional offers.
6.  **Best sellers**
    -   Shows popular products based on sales performance.
7.  **Recommended products**
    -   Presents products suggested to the customer.
8.  **Recently viewed products**
    -   Provides a convenient way to return to products the customer
        viewed earlier.
9.  **Bottom navigation**
    -   Provides persistent navigation to the app's main areas.
    -   The exact tabs and labels have not yet been finalized.

## Theme and appearance

-   Shoply will support both light and dark themes.
-   Light mode will be the initial default and the primary design focus.
-   The app will support system theme detection and a manual theme
    preference in settings.
-   Colours, typography and spacing should be managed through
    centralized design tokens.
-   The agreed brand direction is Deep Navy (`#142B4A`) and Vibrant
    Orange (`#FF7A30`).
-   White (`#FFFFFF`) is the dominant light-mode background, with
    Light Grey (`#F5F6F8`) used selectively for secondary surfaces.
-   Orange is reserved primarily for important actions and promotional
    emphasis; it must not dominate every section.
-   See `shoply-colour-and-ui-design-guidelines.md` for the complete
    colour palette, button system, typography, spacing and component
    styling rules.

## Guest access

Customers will be able to browse the home screen and product catalogue
without signing in. Authentication will be required for account-specific
actions such as wishlist access and checkout.

## Currency and market presentation

-   Product prices will be displayed in Nigerian Naira (₦).
-   The initial market is Nigeria.
-   Delivery location selection should accommodate Nigerian addresses.

## Product reviews and ratings

Customers with a verified purchase can: - Rate a product from 1--5
stars. - Write a text review. - Edit their review. - Delete their
review. - Read reviews submitted by other customers.

Customers cannot upload photos or videos with reviews. Reviews are
text-and-rating only.

### Review system requirements

-   Verify that a customer purchased the product before accepting a
    review.
-   Prevent duplicate reviews for the same eligible purchase.
-   Calculate and display each product's average rating and review
    count.
-   Support review pagination.
-   Provide administrator moderation capabilities.

## Items intentionally left open

These details have not yet been decided and should not be treated as
requirements: - Exact bottom-navigation tabs and labels. - Home-screen
visual design, colours and typography. - Whether promotional banners are
manually managed or personalized. - The precise rules for flash deals,
best sellers and recommendations. - Whether the home screen layout
changes for signed-in and guest customers. - The detailed review
moderation workflow.

## Agreed home-screen summary

**Delivery location → Search → Promotional banners → Categories → Flash
deals → Best sellers → Recommendations → Recently viewed → Bottom
navigation**
