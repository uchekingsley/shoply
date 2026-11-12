# Shoply — Shopping Cart Requirements

**Project:** Shoply  
**Platforms:** Android and iOS  
**Framework:** React Native with Expo  
**Language:** TypeScript  
**Market:** Nigeria  
**Currency:** Nigerian Naira (₦)  
**Document status:** Requirements based on decisions and cart behaviour agreed so far  

---

## 1. Purpose

The Shopping Cart allows customers to review and manage the products they intend to purchase before proceeding to checkout.

The cart must work for both guest and authenticated customers. It must preserve selected product variations, quantities and cart contents appropriately, while treating the backend as the authority for current prices, discounts and inventory.

## 2. Customer Access

- Guests can add products to their cart and manage the cart without signing in.
- Authenticated customers can manage their cart while signed in.
- Authentication is required before a customer completes checkout.
- If a guest authenticates, their guest cart must be merged with their account cart.

## 3. Cart Screen Content

The cart screen should provide the following information and actions:

- A cart title/header.
- A list of cart line items.
- Product image.
- Product name.
- Selected variation attributes.
- Unit price.
- Quantity.
- Line-item subtotal.
- Remove-item action.
- Promotion-code entry and applied-promotion feedback.
- Order summary.
- Proceed to Checkout action.
- A way to continue shopping.

The screen must clearly distinguish each selected variation of a product.

## 4. Cart Line Items and Product Variations

Each distinct product-and-variation combination must be represented as its own cart line item.

Example:
- 1 black T-shirt, size M.
- 2 white T-shirts, size L.

These are two separate cart line items, even though they belong to the same base product.

If the customer adds more of the exact same product and variation, increase the quantity on the existing line instead of creating an unnecessary duplicate line.

A cart line must identify the product and its specific variation/SKU. It must not be identified using only the base product ID.

## 5. Quantity Management

Customers must be able to:
- Increase an item's quantity.
- Decrease an item's quantity.
- Remove an item from the cart.

Rules:
- Quantity must never be zero or negative while a line item remains in the cart.
- Decreasing the quantity below one should result in a clearly handled removal or confirmation behaviour, as finalized during interaction design.
- Quantity must respect backend-defined purchase limits and current stock.
- The app must communicate when the requested quantity is no longer available.
- Updated quantities and totals must be reflected in the cart after successful changes.

## 6. Cart Persistence

### 6.1 Guest cart

- Store the guest cart locally on the device.
- Preserve it when the application is closed and reopened.
- Do not rely only on in-memory application state.
- Allow the customer to continue browsing and return to the same cart.

### 6.2 Authenticated cart

- Persist the authenticated customer's cart in the backend.
- Make the cart available when the customer signs in on another device.
- Synchronize cart changes with the backend.

## 7. Guest-to-Account Cart Merge

When a guest signs in or registers, merge the locally stored guest cart with the customer's existing account cart.

The merge must follow these rules:

1. Preserve the guest cart contents through authentication.
2. Retrieve or otherwise account for the customer's existing backend cart.
3. Combine quantities when the same product-and-variation combination exists in both carts.
4. Keep different variations as separate line items.
5. Revalidate current product prices and stock.
6. Respect stock limits and backend-defined purchase limits.
7. Inform the customer when an item is unavailable or a requested quantity cannot be retained.
8. Do not silently discard cart items or quantity conflicts.
9. Make the merge safe to retry; repeated requests must not accidentally duplicate quantities.

The exact customer interface for resolving every possible merge conflict is not yet specified and must not be assumed by implementation.

## 8. Inventory Behaviour

**Confirmed decision:** Adding an item to the cart does not reserve or lock inventory.

Consequences:
- Other customers may purchase the same stock while an item is in this customer's cart.
- The cart can become stale after it is created.
- Stock must be revalidated when cart quantities are changed and during checkout.
- If a product or selected variation becomes unavailable, the cart must communicate this and prevent the customer from proceeding with an invalid quantity.
- Inventory reservation or deduction belongs to the order-processing flow, not the Add to Cart action.

The exact point at which inventory is reserved or deducted during order processing will be defined with the order and payment lifecycle.

## 9. Price and Promotion Validation

The backend is authoritative for:
- Current product prices.
- Variation-specific prices.
- Discounts.
- Promotion validity.
- Cart totals.
- Delivery fees.

The cart may display price information returned by the backend, but it must not treat client-calculated values as authoritative.

If a price changes after an item was added:
- Inform the customer of the change.
- Display the updated price and total.
- Ensure the customer has an opportunity to review the change before confirming the order.

## 10. Promotion Code

The cart should provide a promotion-code area where customers can enter and apply a code.

The customer should receive clear feedback when a code is:
- Applied successfully.
- Invalid.
- Expired.
- Not eligible for the current cart.
- Rejected for another backend-defined reason.

The cart should display the discount returned by the backend and update the order summary accordingly.

Promotion eligibility, stacking and usage rules are not defined in this document.

## 11. Order Summary

The cart should display an order summary containing:

| Item | Requirement |
|---|---|
| Subtotal | Sum of the cart item amounts, based on backend-validated prices |
| Discount | Applicable discount returned by the backend |
| Delivery fee | Show when known; otherwise explain that it will be calculated after address selection |
| Total | Display the backend-validated total or clearly identify it as an estimate until delivery details are known |

Do not present an estimated delivery fee or total as a guaranteed final amount.

## 12. Checkout Entry

The Proceed to Checkout action should:
- Be available when the cart has purchasable items.
- Trigger the authentication requirement for guests before checkout can be completed.
- Preserve the cart through authentication.
- Continue the checkout journey after successful authentication.
- Ensure that the cart is revalidated before an order is submitted.

The detailed checkout process is specified separately.

## 13. Empty Cart State

When the cart contains no items, display:
- A clear empty-cart message.
- A suitable visual treatment or icon.
- A Continue Shopping action.

Do not show an order summary that suggests the customer has items to purchase.

## 14. Loading, Error and Exceptional States

The cart must handle:
- Initial cart loading.
- Empty cart.
- Network unavailable.
- Backend request failure.
- Product removed from catalogue.
- Selected variation out of stock.
- Stock quantity reduced.
- Product price changed.
- Promotion code rejected or expired.
- Authentication expiry.
- Guest-to-account merge conflict or failure.
- Cart synchronization failure.

Provide understandable messages and recovery actions where possible. Do not expose raw server errors to customers.

## 15. Visual Design

The cart must follow Shoply's agreed visual direction:
- Deep Navy `#142B4A` for brand and structural emphasis.
- Vibrant Orange `#FF7A30` for the primary checkout action and important promotional emphasis.
- White `#FFFFFF` as the dominant light-mode background.
- Light Grey `#F5F6F8` for secondary surfaces and grouped information.
- Primary Text `#202631` and Secondary Text `#737B87` for readable information.

Use the shared button system, typography, spacing and theme tokens. Refer to `shoply-colour-and-ui-design-guidelines.md` for full styling rules.

## 16. Engineering Requirements

- Represent each cart line with stable product and variation identifiers.
- Persist guest cart data locally.
- Persist authenticated cart data in the backend.
- Synchronize authenticated cart changes with the backend.
- Implement guest-to-account merge so it is safe to retry.
- Revalidate price, stock, discounts and totals with the backend.
- Do not reserve inventory when adding an item to the cart.
- Handle stale data and network failures without silently losing cart contents.
- Keep cart state consistent when the customer changes authentication state.

## 17. Confirmed Requirements and Items Not Yet Decided

### Confirmed
- Guests can add products to and manage a cart.
- Guest cart is persisted locally and survives app restarts.
- Authenticated cart is persisted by the backend and available across devices.
- Guest cart is merged with the account cart after authentication.
- Identical product-and-variation combinations combine quantities.
- Different variations remain separate line items.
- Cart merging revalidates prices and stock.
- Cart merging must be safe to retry.
- Adding to cart does not reserve inventory.
- Stock is revalidated when quantities change and during checkout.
- Backend is authoritative for price, stock, discounts and totals.

### Not decided in this document
- Whether the cart badge counts distinct line items or total units.
- Whether Clear Cart is included in the initial release.
- Exact quantity limits and per-customer purchase limits.
- Exact interface for resolving every cart-merge conflict.
- Whether guest cart data has an expiry period.
- Promotion-code stacking and eligibility rules.
- Exact confirmation interface when a product price changes.

These unresolved details must remain open rather than being treated as approved requirements.
