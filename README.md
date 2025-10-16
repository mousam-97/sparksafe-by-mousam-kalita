## Project Overview

SparkSafe - Mobile-first Wildfire Home-Hardening web app.

Structure overview
```
src/
  components/
    common/           # Reusable UI (Button, Card, Badge, ...)
    layout/           # Page chrome (Page, BottomNav)
  pages/              # Route pages (Dashboard, Marketplace, ProductDetails, Profile, Cart)
  styles/             # Global CSS and variables
  types/              # Shared TS types
```

Tech
- React + TypeScript
- CSS Modules (.module.css)
- React Router


This project is a small React + TypeScript app that showcases a safety upgrade dashboard, a marketplace with filtering, and a simple cart flow. Styling is done with CSS Modules; state is managed via React Context.

## Feature Choice and Why
1. Home-Hardening Dashboard: lists upgradable tasks with progress tracking, lets you mark tasks complete, and surfaces recommended products. A details modal provides additional context to support informed decisions.
2. Marketplace: browse and purchase recommended products with filterable listings.
3. Product Details: learn about a product’s features, benefits, and compatibility.
4. Cart: review selected items with quantities and automatic price calculations.
5. Profile: basic user info page (placeholder for the demo).

## How to Run

Prerequisites:
- Node.js 18+ and npm 9+

Setup and start:

```bash
npm install
npm start
```

The app will start in development mode, typically at `http://localhost:3000`.

## Design Choices (Short)

- React Contexts (`ProductsContext`, `CartContext`, `UpgradesContext`) centralize shared state and keep components simple.
- URL-driven filters for Marketplace (via `useSearchParams`) enable sharable, bookmarkable filter state.
- CSS Modules provide locally-scoped styles and avoid global naming collisions.
- Accessibility: semantic buttons/labels and keyboard support (e.g., Enter to trigger search).

## Stretch Goals Completed

1. "Add to Cart" functionality using React state
2. Progress bar updates after marking a task complete



