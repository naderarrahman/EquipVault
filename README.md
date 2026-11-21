# 🏗️ EquipVault — Full-Stack Equipment Rental Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better%20Auth-10B981?style=flat-square)](https://www.better-auth.com/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-equip--vault.vercel.app-EA580C?style=flat-square&logo=vercel&logoColor=white)](https://equip-vault.vercel.app)

> **EquipVault** is a modern, full-stack equipment rental marketplace where individuals and businesses can list, discover, book, and pay for professional tools, cameras, audio gear, construction machinery, and event equipment with end-to-end role-based workflow management.

- **Live Application:** [https://equip-vault.vercel.app](https://equip-vault.vercel.app)
- **Backend API:** [https://equip-vault-server.vercel.app](https://equip-vault-server.vercel.app)

---

## 📸 Platform Overview

![EquipVault Platform Overview](./public/overview/overview.jpeg)

---

## ✨ Core Features

### 🛒 Public Marketplace & Discovery
- **Dynamic Homepage:** Server-rendered sections featuring live featured equipment, category breakdown with real-time item counts, value propositions, and a step-by-step rental workflow powered by smooth Framer Motion animations.
- **Advanced Equipment Catalog (`/equipment`):** Multi-criteria filtering by keyword search, category, rental billing type (hourly/daily/weekly), price range, stock availability, and sorting options.
- **Detailed Equipment Inspection:** Comprehensive specification sheets, owner details, rental terms, and instant booking availability.

### 🔐 Authentication & Multi-Role Portals
Powered by **Better Auth** with MongoDB adapter, supporting both **Email/Password** and **Google OAuth 2.0**, with role-aware route protection:
- **Customer Workspace:** Track rental booking requests and approval statuses, manage saved favorites, complete Stripe payments, and view personal rental analytics.
- **Owner Portal:** List new equipment with cloud image uploads (ImgBB integration), manage inventory stock and pricing, and approve or decline incoming rental requests.
- **Admin Control Center:** Moderate pending equipment submissions (`approve` / `reject`), manage platform users and roles, audit all bookings, and monitor Stripe payment transactions.

### 💳 Payments & Media
- **Stripe Checkout Integration:** Seamless, secure online rental payments with automated booking confirmation.
- **Direct Image Hosting:** Client-side image upload integration with ImgBB for crisp equipment thumbnails and user avatars.
- **Responsive & Theme-Ready UI:** Clean, accessible interface with dark/light mode support built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Routing** | Next.js (App Router, Server & Client Components), React, TypeScript |
| **Styling & Motion** | Tailwind CSS, Framer Motion, Lucide Icons |
| **Authentication** | Better Auth (`better-auth/react`, `@better-auth/mongo-adapter`), Google OAuth |
| **Database & Backend** | MongoDB Atlas, Express.js REST API (`equip-vault-server`) |
| **Payments & Media** | Stripe Checkout, ImgBB Image Hosting API |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```text
EquipVault-client/
├── public/
│   └── overview/
│       └── overview.jpeg             # Platform UI showcase screenshot
├── src/                              # (Or root app/ depending on project layout)
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/
│   │   │       └── route.ts          # Better Auth catch-all API route handler
│   │   ├── dashboard/
│   │   │   ├── admin/                # Admin stats, user management, listing moderation & payments
│   │   │   ├── customer/             # Customer overview, my bookings, saved favorites & profile
│   │   │   └── owner/                # Owner overview, add/edit equipment, inventory & requests
│   │   ├── equipment/                # Public equipment catalog & single equipment details pages
│   │   ├── sign-in/                  # Email/Password & Google OAuth login page
│   │   ├── sign-up/                  # Role-selectable registration page (Customer / Owner)
│   │   ├── unauthorized/             # Role-guard fallback page
│   │   ├── layout.tsx                # Root layout, fonts, theme provider & global navigation
│   │   └── page.tsx                  # Marketplace homepage with server-side data fetching
│   ├── components/                   # Reusable UI, navbar, footer, home sections & dashboard widgets
│   ├── lib/
│   │   ├── services/
│   │   │   ├── getApi.ts             # Typed GET API service functions (public & authenticated)
│   │   │   └── postApi.ts            # Typed POST/mutation API service functions
│   │   ├── api.ts                    # Server-side session token retrieval & authFetch wrapper
│   │   ├── auth.ts                   # Better Auth server configuration & trusted origins
│   │   └── auth-client.ts            # Better Auth React client with inferred user role fields
│   └── types/                        # Centralized TypeScript interfaces & API response types
├── .env.local                        # Local environment variables (git-ignored)
├── next.config.ts                    # Next.js image domains & build configuration
├── package.json                      # Dependencies & scripts
└── tsconfig.json                     # TypeScript configuration
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
# Backend REST API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth Configuration
BETTER_AUTH_SECRET=your_32_character_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB Atlas (Used by Better Auth MongoDB Adapter)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImgBB Image Upload API
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/naderarrahman/EquipVault.git](https://github.com/naderarrahman/EquipVault.git)
   cd EquipVault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create `.env.local` using the template above and ensure the backend server (`EquipVault-server`) is running on `http://localhost:5000`.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
- `npm run dev` — Runs the Next.js development server
- `npm run build` — Creates an optimized production build
- `npm run start` — Starts the production Next.js server
- `npm run lint` — Runs ESLint across the codebase

---

## 🌐 Production Deployment Notes (Vercel)

When deploying to Vercel, ensure the following are configured:
1. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL (`https://equip-vault-server.vercel.app`).
2. Set both `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your production frontend domain (`https://equip-vault.vercel.app`).
3. Add `https://equip-vault.vercel.app` and `https://equip-vault.vercel.app/api/auth/callback/google` to your **Google Cloud Console OAuth 2.0** authorized origins and redirect URIs.
4. Match `CLIENT_URL` on the backend server to `https://equip-vault.vercel.app` for CORS and Stripe redirects.

---

## 👨‍💻 Author

**Nader Ar Rahman**
- **Portfolio:** [nader-ar-rahman.vercel.app](https://nader-ar-rahman.vercel.app)
- **GitHub:** [@naderarrahman](https://github.com/naderarrahman)
- **LinkedIn:** [linkedin.com/in/naderarrahman](https://www.linkedin.com/in/naderarrahman)