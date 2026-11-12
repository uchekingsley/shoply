# Shoply — Product Details Page Requirements

**Project:** Shoply  
**Platform:** Android and iOS  
**Framework:** React Native with Expo  
**Language:** TypeScript  
**Document status:** Product requirements draft  
**Market:** Nigeria  
**Currency:** Nigerian Naira (₦)

---

## 1. Purpose

The Product Details page gives customers the information they need to evaluate a product, choose the correct variation, and add it to their cart or proceed directly to checkout.

It must support different product types, including fashion, phones, electronics, home and kitchen products, beauty products, and groceries. Product attributes and variations should therefore be data-driven rather than hard-coded for one category.

## 2. Visual design direction

The Product Details page must follow Shoply's agreed Deep Navy and
Vibrant Orange design direction. White is the dominant light-mode
background, while Light Grey is used selectively for secondary
surfaces. Use orange for primary purchase actions and promotional
emphasis, not as a general page background. Product imagery must remain
the visual focus.

The page must also support the application's dark theme. All colours,
typography and spacing should use centralized design tokens rather than
page-specific hardcoded values. Refer to
`shoply-colour-and-ui-design-guidelines.md` for the full design system.

## 3. Customer access

- Guests can open and view product details.
- Guests can select product variations and add products to their guest cart.
- Guests can use **Buy Now** to begin checkout; authentication is required before completing checkout.
- Adding a product to a wishlist requires the customer to sign in.
- If a guest signs in or registers later, their guest cart should be preserved and merged with their account cart according to the cart-merging rules.

## 4. Page structure

The page should contain the following sections in order.

### 3.1 Header

- Back navigation.
- Wishlist action.
- Share action.
- Wishlist action prompts guests to sign in.
- The header should remain easy to access while the customer browses the page.

### 3.2 Product image gallery

- Display the product's images in a swipeable gallery.
- Show a visual indicator of the current image and total images.
- Images should maintain a consistent presentation without being stretched.
- If a product has no image, display a designed placeholder.
- Product image uploads by customers are not part of this product-details experience.

### 3.3 Product identity and rating

Display:
- Product name.
- Average rating, where ratings exist.
- Number of reviews.
- A link or action that takes the customer to the reviews section.

If a product has no reviews, show a clear empty state rather than a fabricated rating.

### 3.4 Pricing and promotions

Display:
- Current selling price in Nigerian Naira.
- Original price when the product is discounted.
- Discount percentage or amount when applicable.

Pricing must come from the backend. The app must not calculate or treat a client-side price as authoritative during checkout.

### 3.5 Availability and stock status

Support these states:

| State | Customer experience |
|---|---|
| In stock | Product can be added to cart or purchased. |
| Low stock | Show a limited-stock message where the backend provides a reliable threshold or label. |
| Out of stock | Disable purchase actions for the unavailable selection. |
| Discontinued | Clearly mark the product as unavailable and disable purchase actions. |

Availability may differ by variation. For example, a black T-shirt in size M may be available while size XL is out of stock.

**Important:** The backend must revalidate stock when the cart is updated and again during checkout. The app must not rely on the stock value previously loaded on the product page.

### 3.6 Product variations

Products may have different variation attributes depending on their category.

Examples:
- Fashion: size, colour.
- Phones: storage capacity, colour.
- Electronics: model, capacity, configuration.
- Other categories: any applicable product-specific attributes.

Requirements:
- Render variation options dynamically from product data.
- Make the currently selected options visually clear.
- Update price and availability when a selection changes if the selected variation has different values.
- Prevent customers from purchasing a combination that is unavailable.
- Require all mandatory variation choices before adding the item to the cart.
- Clearly communicate when a particular combination is unavailable.

### 3.7 Quantity selector

- Allow customers to increase or decrease the quantity.
- Quantity cannot be less than one.
- Enforce available stock and any backend-defined purchase limits.
- Revalidate quantity against current stock when adding to cart and during checkout.

### 3.8 Description

- Display the product description.
- Support readable formatting and longer descriptions.
- Avoid forcing every category into the same rigid description structure.

### 3.9 Specifications

- Display structured product specifications when available.
- Specifications should be data-driven because attributes vary by product category.
- Hide the specifications section when no specifications are provided.

### 3.10 Delivery information

Show relevant delivery information, such as:
- Estimated delivery window, where available.
- Delivery fee or an indication that the fee will be calculated after the delivery address is selected.
- Any important delivery restrictions or conditions.

Delivery estimates and fees should be supplied or confirmed by the backend/delivery service. Do not present an unverified estimate as guaranteed.

### 3.11 Customer reviews

Display:
- Average rating and total review count.
- Customer ratings and written review text.
- A route or action to view more reviews.
- A suitable empty state when there are no reviews.

Review rules already agreed for Shoply:
- Only customers with a verified purchase can submit a review.
- A review contains a 1–5 star rating and written text.
- Customers can edit or delete their own reviews.
- Customers cannot upload photos or videos with reviews.
- Prevent duplicate reviews for the same eligible purchase.
- Reviews are paginated.
- Administrators can moderate reviews.

### 3.12 Related products

- Show relevant products that customers may also want to explore.
- Tapping a related product opens its Product Details page.
- The backend should determine or supply the related-product results.

## 5. Persistent purchase actions

A purchase area should remain accessible near the bottom of the screen.

It contains:
- **Add to Cart**
- **Buy Now**

Expected behaviour:

**Add to Cart**
1. Validate that required variations have been selected.
2. Validate the requested quantity.
3. Submit the selected product/variation and quantity to the cart.
4. Show clear feedback when the item is added.
5. Keep the customer on the Product Details page.

**Buy Now**
1. Validate the selected variations and quantity.
2. Begin checkout with the selected item.
3. If the customer is a guest, require authentication before checkout can be completed.
4. Preserve the intended purchase through the authentication step.

Purchase actions must be disabled when the selected variation is unavailable or otherwise not purchasable.

## 6. Cart behaviour for product variations — Decision 008

**Confirmed decision:** Customers can purchase multiple variations of the same product in one order.

For example, a customer may order:
- 1 black T-shirt, size M.
- 2 white T-shirts, size L.

Each distinct product-and-variation combination is treated as a separate cart line item, with its own:
- Product reference.
- Variation/SKU reference.
- Selected variation attributes.
- Quantity.
- Price snapshot for display and cart calculation, subject to backend validation.

If the customer adds more of the exact same product-and-variation combination, the cart should update that line item's quantity rather than create an unnecessary duplicate line.

Different variation combinations must remain separate line items, even when they belong to the same base product.

The backend remains authoritative for current price, stock, discounts, and order totals.

## 7. Loading, error, and empty states

The page should account for:
- Initial product loading.
- Product not found or removed.
- Network failure with a retry action.
- Product image loading failure.
- No reviews.
- No related products.
- A variation becoming unavailable after the page was loaded.
- Stock or price changing before the customer adds the item or checks out.

Errors should be understandable and actionable. Avoid exposing raw API or server error messages to customers.

## 8. Data and engineering considerations

The Product Details experience should be backed by product data that can represent:
- Product identity and category.
- Product images.
- Description and specifications.
- Base product information.
- Variations and their identifiers/SKUs.
- Variation-specific prices and stock where applicable.
- Discount information.
- Ratings and review counts.
- Delivery information where available.
- Related products.

Engineering rules:
- Treat backend data as the source of truth for product price and inventory.
- Use stable product and variation identifiers.
- Do not identify a cart line only by the base product ID; variation identity must be included.
- Handle stale product data and stock changes gracefully.
- Keep category-specific attributes flexible instead of hard-coding only fashion or electronics fields.
- Load reviews and related products in a way that does not unnecessarily delay the main product information.

## 9. Accessibility and usability

- Make variation choices and purchase actions easy to identify.
- Provide accessible labels for icon-only controls.
- Ensure text and controls remain usable across common Android and iOS screen sizes.
- Do not rely on colour alone to communicate selected, unavailable, or discounted states.
- Keep important product and purchase information readable.

## 10. Out of scope for this page

The following are not part of the Product Details page itself:
- Seller or vendor management.
- Customer photo/video reviews.
- Payment processing.
- Full checkout and delivery-address management.
- Administrator review moderation interface.

These may be covered in separate Shoply requirements documents.

## 11. Confirmed decisions and open items

### Confirmed
- Guests can browse product details.
- Wishlist requires authentication.
- Product variations are dynamic by product type.
- Availability can differ by variation.
- Customers can buy multiple variations of the same product in one order.
- Each distinct variation combination is a separate cart line item.
- Reviews are restricted to verified purchasers and contain text plus a 1–5 star rating.
- Customers cannot upload review photos or videos.
- Shoply launches in Nigeria and displays prices in Nigerian Naira.

### Still to define
- Exact visual design and layout details.
- Whether product image zoom is supported.
- Exact stock thresholds and wording for low-stock messages.
- Whether any product categories require special purchase limits.
- The detailed related-products ranking rules.
- Whether the page should show delivery estimates before an address is selected, and how precise those estimates can be.
- The exact review sorting and filtering options.

---

## 11. Agreed page summary

The Shoply Product Details page allows guests and signed-in customers to inspect products, browse images, review pricing and availability, choose category-specific variations, set quantities, read specifications and customer reviews, and explore related products.

Customers can add different variations of the same product to one order. Each distinct variation combination is maintained as its own cart line item. The backend validates stock and pricing throughout the purchase flow.
