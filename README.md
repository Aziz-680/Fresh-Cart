# Fresh Cart

Fresh Cart is a responsive e-commerce storefront built with Next.js. Customers can browse products, categories, and brands; manage a cart; sign in; view orders; and continue through cash or online checkout flows. The application uses an external e-commerce API for catalog, account, cart, and order data.

## Features

- Product catalog and product detail pages, with product data revalidated periodically.
- Category and brand directories, with product listings filtered by the selected category or brand.
- Credentials-based registration and sign-in using NextAuth.js.
- Authenticated cart, order history, profile, and payment pages.
- Cart state shared through React Context.
- Cash and online checkout integrations provided by the external API.
- Persistent light/dark theme switch.
- Responsive layouts, product/category sliders, toast notifications, and optimized remote images.

## Technologies and libraries

### Application platform

- **Next.js 15** — App Router, route handlers, server/client components, middleware, image/font optimization, and production builds.
- **React 19** and **React DOM 19** — UI and client-side interactions.
- **JavaScript and TypeScript** — the project uses both `.js`/`.jsx` and `.ts`/`.tsx` files.
- **Node.js 20+** and **npm** — runtime and package management.

### Styling and UI

- **Tailwind CSS 4**, **PostCSS**, and **`@tailwindcss/postcss`** — utility-first styling and CSS processing.
- **`tw-animate-css`** — animation utilities.
- **`class-variance-authority`**, **`clsx`**, and **`tailwind-merge`** — composing and managing conditional component classes.
- **Radix UI** (`@radix-ui/react-label`, `@radix-ui/react-slot`) — accessible UI primitives used by local components.
- **Lucide React** and **Font Awesome Free** — icons.
- **Next.js Font** with Geist — application fonts.
- **`next-themes`** — persisted light/dark theme selection.
- Local components in `src/components/ui` provide the app's button, card, form, input, label, badge, and toast UI.

### Forms, authentication, and application state

- **`react-hook-form`** — form state and validation integration.
- **`@hookform/resolvers`** and **Zod** — schema-based form validation.
- **NextAuth.js v4** — credential authentication and session management.
- **`jwt-decode`** — reading identity claims from the authentication API token.
- **React Context** — shared cart state.

### Data, navigation, and feedback

- **Fetch API** — server-side catalog/category/brand requests and client data loading.
- **Axios** — cart, profile, order, and payment API actions.
- **Swiper** — product/category sliders.
- **Sonner** — toast notifications.

### Development and quality

- **ESLint 9** and **`eslint-config-next`** — linting.
- **TypeScript** and **`@types/node`**, **`@types/react`**, **`@types/cookie`** — static types and editor support.
- **`@eslint/eslintrc`** — ESLint configuration compatibility.

## Main pages and routes

| Route | Purpose |
| --- | --- |
| `/` | Product storefront and featured categories |
| `/productDetails/[id]` | Product details |
| `/categories` | Category directory |
| `/categoryProducts?id=<categoryId>` | Products in a selected category |
| `/brands` | Brand directory |
| `/brandProducts?id=<brandId>` | Products from a selected brand |
| `/cart` | Authenticated shopping cart |
| `/payment` | Checkout options |
| `/allorders` | Authenticated order history |
| `/profile` | Authenticated account profile |
| `/login` and `/register` | Authentication pages |
| `/api/auth/[...nextauth]` | NextAuth route handler |

## Project layout

- `src/app` — App Router pages, layouts, route handlers, loading/error states, and page components.
- `src/apis` — catalog, category, brand, product, and order data helpers.
- `src/CartActions`, `src/PaymentActions`, `src/ProfileActions` — server actions for commerce/account operations.
- `src/Context` — shared cart context.
- `src/components/ui` — reusable UI primitives.
- `src/schema` — Zod validation schemas.
- `src/types` — shared TypeScript and NextAuth type definitions.
- `src/middleware.ts` and `src/auth.ts` — route access and authentication configuration.
- `public` and `src/assets` — static and imported visual assets.

## External services

The app currently integrates with the Route Misr e-commerce API at `https://ecommerce.routemisr.com/api/v1` for product, category, brand, authentication, cart, account, and order endpoints. Online checkout and payment redirects also depend on that API and its configured payment provider. This repository does not include its own database or payment processor.

## Requirements

- Node.js 20 or newer
- npm
- Network access to the external API

## Local development

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and set `NEXTAUTH_SECRET`. Keep secrets out of source control.
3. Run `npm run dev` and open `http://localhost:3000`.

`API` is optional and defaults to `https://ecommerce.routemisr.com/api/v1`. `NEXTAUTH_URL` must be the canonical site origin, without a trailing slash; set it to `http://localhost:3000` locally.

## Production checks

Available npm scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with Turbopack. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create the optimized production build with Turbopack. |
| `npm start` | Serve the production build. Run this after `npm run build`. |

Before deployment, run `npm ci`, `npm run lint`, and `npm run build`. To test the production build locally, run `npm start` after building.

## Deploying

This project can be deployed to any Node.js host that supports Next.js 15. For Vercel, import the repository and keep the detected Next.js build and output settings. Configure these environment variables for **Production**, and also for Preview if preview deployments should support sign-in and checkout:

| Variable | Required | Value |
| --- | --- | --- |
| `NEXTAUTH_SECRET` | Yes | A unique, long random secret. Generate a different value per environment; never commit it. |
| `NEXTAUTH_URL` | Yes | The canonical deployed origin, such as `https://shop.example.com`, with no trailing slash. |
| `API` | No | API base URL; defaults to `https://ecommerce.routemisr.com/api/v1`. |

After setting variables, redeploy so the build/runtime receives them. Add the deployed origin to any provider/API allowlists as needed. Confirm that registration, sign-in/sign-out, product images, cart operations, cash checkout, and the payment-provider success/cancel redirects work against the production domain. Online checkout uses `NEXTAUTH_URL` (or Vercel's deployment URL when available) rather than a hard-coded local address.

## Notes and limitations

- Catalog, brand, category, account, cart, and order features require the external API to be available.
- Payment-provider redirects and production sign-in should be tested using the deployed canonical domain.
- Keep `.env.local` and all secrets out of source control. `.env.example` documents the expected variable names.
