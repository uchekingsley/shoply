# 🛍️ Shoply

> A modern, single-vendor mobile e-commerce application built with **React Native (Expo)** and **TypeScript**, specifically designed for the **Nigerian market** (NGN ₦).

[![React Native](https://img.shields.io/badge/React%20Native-0.86-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v57-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange.svg)](https://github.com/pmndrs/zustand)
[![FlashList](https://img.shields.io/badge/List-Shopify%20FlashList-purple.svg)](https://shopify.github.io/flash-list/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 About Shoply

Shoply is a high-performance, single-vendor mobile shopping application. Unlike marketplace platforms with fragmented sellers, Shoply owns and coordinates its own product catalogue, inventory, pricing, and deliveries across Nigeria.

The app supports guest browsing, offline/persistent cart synchronization, dynamic variations (size, color, storage), instant price and stock recalculation, high-performance catalog scrolling, and dark/light mode.

---

## ✨ Features

- **🏠 Home & Discovery**:
  - Promotional carousel banners.
  - Multi-category grid navigation.
  - Flash deals countdown section & Best Sellers showcase.
  - Delivery location selector (Lagos, Abuja, Rivers, Kano, etc.).
  - "Recently Viewed" history drawer.
- **🔍 Fast Search & Filtering (FlashList)**:
  - 60fps recyclable product lists powered by `@shopify/flash-list`.
  - Multi-attribute search (title, tags, category).
  - Dynamic sorting: *Popular, Price: Low to High, Price: High to Low, Top Rated*.
  - Category pill filter chips and responsive empty states.
- **📦 Product Details Page (PDP)**:
  - High-res swipeable image gallery with discount badges.
  - Interactive variation selector (Color, Size, Storage) with real-time stock availability and pricing updates.
  - Customer ratings, verified review breakdowns, and delivery estimates.
  - Bottom sticky purchase bar with dynamic quantity selector and "Buy Now".
- **🛒 Shopping Cart & Local Persistence**:
  - Full line-item management with instant quantity adjustment.
  - Automatic discount engine (e.g., `SHOPLY10`, `NAIJA10`).
  - Nigerian state-based delivery fee calculations.
  - Complete order cost breakdown (Subtotal, Discounts, Delivery Fee, Total).
  - Synchronous native local storage via **`react-native-mmkv`**.
- **❤️ Saved Items / Wishlist**:
  - Dedicated Wishlist screen with quick-add actions and clear-all.
  - Wishlist toggles directly from product cards and headers.
- **👤 Profile & Authentication Gate**:
  - Guest-friendly experience: users can explore and build a cart without an account.
  - Account modal prompt for authenticated actions (Order History, Address Book, Wishlist Sync, Checkout).
- **🎨 Design System & Theming**:
  - Built strictly around the official Shoply UI Guidelines:
    - **Deep Navy** (`#142B4A`) — Brand trust & structure.
    - **Vibrant Orange** (`#FF7A30`) — Primary CTA & actions.
    - Clean light surfaces and complete dark theme support.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/) (SDK 57) |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Offline Storage** | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) |
| **Virtualization** | [@shopify/flash-list](https://shopify.github.io/flash-list/) |
| **Iconography** | [@expo/vector-icons](https://icons.expo.fyi/) (`Ionicons`) |
| **Target Market** | Nigeria (`NGN ₦`) |

---

## 📂 Project Structure

```text
Shoply/
├── shoplify prd/               # Comprehensive PRD & UI Design Guidelines
├── assets/                     # Images, logos, and tab icons
└── src/
    ├── app/                    # Expo Router file-based screens
    │   ├── _layout.tsx         # Root theme provider & tabs wrapper
    │   ├── index.tsx           # Home Screen
    │   ├── search.tsx          # Search & Category Catalog (FlashList)
    │   ├── cart.tsx            # Shopping Cart & Checkout Preview
    │   ├── wishlist.tsx        # Saved items screen
    │   ├── profile.tsx         # User Profile & Guest Account view
    │   └── product/
    │       └── [id].tsx        # Dynamic Product Details Page (PDP)
    ├── components/
    │   ├── cart/               # Cart item row, promo code, order summary
    │   ├── home/               # Search header, location modal, carousel, deals
    │   ├── product/            # Gallery, variations, info, reviews, footer
    │   └── ui/                 # Buttons, inputs, product cards, badges, auth modals
    ├── constants/              # Theme, colors, typography, spacing tokens
    ├── data/                   # Initial mock datasets (products, categories, reviews)
    ├── store/                  # Zustand stores (Cart, Wishlist, Recently Viewed)
    ├── types/                  # TypeScript domain models & interfaces
    └── utils/                  # Currency formatting, delivery calculations, MMKV storage
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS) or Android Emulator / Physical Device with [Expo Go](https://expo.dev/go)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/uchekingsley/shoply.git
   cd shoply
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

4. **Run on platform**:
   - Press **`a`** for Android Emulator / Device.
   - Press **`i`** for iOS Simulator.
   - Press **`w`** for Web.

---

## 🛣️ Roadmap

- [x] **Phase 1: Foundations & Architecture**
  - [x] Complete UI design tokens & dark/light theme support.
  - [x] Home screen with carousel, deals ticker, and categories.
  - [x] PDP with variations selector and stock check.
  - [x] Fast catalog search with `@shopify/flash-list`.
  - [x] Cart and Wishlist state with Zustand & MMKV persistence.
- [ ] **Phase 2: Authentication & Profile Services**
  - [ ] Phone / SMS OTP & Email Authentication.
  - [ ] Customer address book with Nigerian LGAs & landmark support.
  - [ ] Cross-device cart synchronization on sign-in.
- [ ] **Phase 3: Checkout & Payment Integration**
  - [ ] Integration with Nigerian payment providers (Paystack / Flutterwave).
  - [ ] Cash on Delivery (COD) and Bank Transfer workflows.
- [ ] **Phase 4: Backend API & Orders**
  - [ ] Live catalog API replacing mock datasets.
  - [ ] Real-time stock revalidation.
  - [ ] Live order tracking & push notifications.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
