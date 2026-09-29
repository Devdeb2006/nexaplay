# Streamora — Two-Month Build Plan

61 days across 9 phases, mapped to the Streamora PRD and its 100-mark rubric. Six work days a week with a review/buffer day built in.

Start: **Tue, 29 Sept 2026** · Target finish: **Sat, 28 Nov 2026**

> Also published as an interactive checklist with persistent checkboxes: <https://claude.ai/code/artifact/548810c6-8e00-4350-8bee-ece9e7e7fb47>

---

## Phase 1: Foundation, Tooling & Routing Skeleton

*Tue, 29 Sept 2026 – Mon, 05 Oct 2026 · React structure & routing — 15 pts*

- [ ] **Day 1 (Tue, 29 Sept 2026) — Lock the stack & install dependencies**
      - Install react-router-dom, framer-motion, swiper, react-hook-form
      - Get a TMDB (or OMDb/TVMaze) API key, confirm it works with a test fetch
      - Create .env and a secret-free .env.example
- [ ] **Day 2 (Wed, 30 Sept 2026) — Design the folder architecture**
      - src/pages, components, layouts, routes, context, services, hooks, admin
      - Agree naming conventions, commit the empty skeleton
- [ ] **Day 3 (Thu, 01 Oct 2026) — Build the router skeleton in main.jsx**
      - createBrowserRouter with public / protected / admin layout routes
      - Placeholder page for every route in the PRD's page list
- [ ] **Day 4 (Fri, 02 Oct 2026) — Build the global layout**
      - Navbar, Footer, NotFound page
      - Tailwind theme tokens: brand colors, fonts, spacing scale
- [ ] **Day 5 (Sat, 03 Oct 2026) — Build the TMDB service module**
      - services/tmdb.js fetch wrapper with base URL + key injection
      - Endpoints: trending, popular, genres, search, details, videos
- [ ] **Day 6 (Sun, 04 Oct 2026) — Build reusable UI primitives**
      - Button, Skeleton, Spinner, ErrorState, EmptyState components
- [ ] **Day 7 (Mon, 05 Oct 2026) — Review & checkpoint**
      - Smoke-test every route resolves; layout at all breakpoints
      - Commit: "Phase 1 — foundation & routing"

## Phase 2: Home Page & Movie Data

*Tue, 06 Oct 2026 – Mon, 12 Oct 2026 · API integration — 20 pts · Tailwind design — 15 pts*

- [ ] **Day 8 (Tue, 06 Oct 2026) — Hero section**
      - Featured-movie backdrop pulled from the API, CTA buttons
- [ ] **Day 9 (Wed, 07 Oct 2026) — Trending / Popular row**
      - Swiper carousel, responsive breakpoints, nav controls
- [ ] **Day 10 (Thu, 08 Oct 2026) — Genres / categories section**
      - Filter chips sourced from the TMDB genre list
- [ ] **Day 11 (Fri, 09 Oct 2026) — MovieCard component**
      - Poster, title, rating, hover animation via Framer Motion
- [ ] **Day 12 (Sat, 10 Oct 2026) — Wire loading & error states**
      - Skeleton grid while fetching, error message on failure
- [ ] **Day 13 (Sun, 11 Oct 2026) — Header search bar**
      - Debounced query against the TMDB search endpoint
- [ ] **Day 14 (Mon, 12 Oct 2026) — Review & checkpoint**
      - Home page responsive + empty-state QA
      - Commit

## Phase 3: Browse & Movie Details

*Tue, 13 Oct 2026 – Mon, 19 Oct 2026 · API integration — 20 pts · Routing — 15 pts*

- [ ] **Day 15 (Tue, 13 Oct 2026) — Browse Movies page**
      - Grid layout, fetch discover/popular
- [ ] **Day 16 (Wed, 14 Oct 2026) — Filtering & sorting**
      - Genre, year, popularity/rating/release-date
- [ ] **Day 17 (Thu, 15 Oct 2026) — Pagination / "Load more"**
      - Infinite or page-based, your call
- [ ] **Day 18 (Fri, 16 Oct 2026) — Movie Details route (:id)**
      - Fetch details + credits by the API's movie id
- [ ] **Day 19 (Sat, 17 Oct 2026) — Trailer/video area**
      - Embed via TMDB videos endpoint; synopsis, genre, rating
- [ ] **Day 20 (Sun, 18 Oct 2026) — Favourite button + subscription prompt**
      - UI only for now — wire to data layer next phase
- [ ] **Day 21 (Mon, 19 Oct 2026) — Review & checkpoint**
      - Browse + Details QA on all breakpoints
      - Commit

## Phase 4: Local Data Layer & Authentication

*Tue, 20 Oct 2026 – Mon, 26 Oct 2026 · Authentication & protected routes — 10 pts*

- [ ] **Day 22 (Tue, 20 Oct 2026) — Stand up the local data layer**
      - JSON Server or db.js: users, favourites, subscriptions, payments, watchHistory, adminSettings
- [ ] **Day 23 (Wed, 21 Oct 2026) — AuthContext**
      - Register / login / logout, persisted session
- [ ] **Day 24 (Thu, 22 Oct 2026) — Register page**
      - Form + validation, duplicate-email handling
- [ ] **Day 25 (Fri, 23 Oct 2026) — Login page**
      - Auth + inline feedback, error states
- [ ] **Day 26 (Sat, 24 Oct 2026) — ProtectedRoute wrapper**
      - Wired into the router, redirects unauthenticated users
- [ ] **Day 27 (Sun, 25 Oct 2026) — AdminRoute wrapper + Admin Login skeleton**
      - Separate login surface, role guard stub
- [ ] **Day 28 (Mon, 26 Oct 2026) — Review & checkpoint**
      - Full auth walkthrough incl. edge cases
      - Commit

## Phase 5: Favourites & Subscriptions

*Tue, 27 Oct 2026 – Mon, 02 Nov 2026 · Favourites & subscription logic — 10 pts*

- [ ] **Day 29 (Tue, 27 Oct 2026) — Favourites logic**
      - Add/remove in the local data layer, optimistic UI
- [ ] **Day 30 (Wed, 28 Oct 2026) — Favourites page**
      - Saved-movies grid, empty state
- [ ] **Day 31 (Thu, 29 Oct 2026) — Subscription Plans page**
      - Plan cards, benefits list
- [ ] **Day 32 (Fri, 30 Oct 2026) — Plan selection flow**
      - Carries the selected plan into the Payment page
- [ ] **Day 33 (Sat, 31 Oct 2026) — Framer Motion modal**
      - Confirm-plan dialog or favourite toast, fade/scale transitions
- [ ] **Day 34 (Sun, 01 Nov 2026) — Swiper polish pass**
      - "Top picks" / continue-watching row
- [ ] **Day 35 (Mon, 02 Nov 2026) — Review & checkpoint**
      - Self-check against the 10+10 mark rubric rows
      - Commit

## Phase 6: Payment (Flutterwave test mode) & Profile

*Tue, 03 Nov 2026 – Mon, 09 Nov 2026 · Flutterwave test payment — 10 pts*

- [ ] **Day 36 (Tue, 03 Nov 2026) — Flutterwave test-mode setup**
      - Public key in env, checkout trigger wired up
- [ ] **Day 37 (Wed, 04 Nov 2026) — Payment Summary page**
      - Plan, price, user details
- [ ] **Day 38 (Thu, 05 Nov 2026) — Wire the checkout**
      - Success/failure callback handling
- [ ] **Day 39 (Fri, 06 Nov 2026) — Thank You / Payment Success page**
      - Confirm payment, write subscription + payment record
- [ ] **Day 40 (Sat, 07 Nov 2026) — Profile page**
      - Account details, subscription badge, watch history
- [ ] **Day 41 (Sun, 08 Nov 2026) — Gate the protected viewing experience**
      - Require an active subscription to unlock it
- [ ] **Day 42 (Mon, 09 Nov 2026) — Review & checkpoint**
      - Full payment path incl. a failed-payment case
      - Commit

## Phase 7: Admin Panel

*Tue, 10 Nov 2026 – Mon, 16 Nov 2026 · Admin pages & role-based access — 10 pts*

- [ ] **Day 43 (Tue, 10 Nov 2026) — Admin Dashboard**
      - Summary cards: users, subscriptions, payments, favourites, catalogue activity
- [ ] **Day 44 (Wed, 11 Nov 2026) — User Management**
      - List users, inspect status, activate/deactivate
- [ ] **Day 45 (Thu, 12 Nov 2026) — Content Management**
      - Featured movie IDs, approved video links, promo banners
- [ ] **Day 46 (Fri, 13 Nov 2026) — Subscriptions/Payments admin view**
      - Records table — statuses and dates
- [ ] **Day 47 (Sat, 14 Nov 2026) — Harden admin auth**
      - Separate login route, role-guard edge cases
- [ ] **Day 48 (Sun, 15 Nov 2026) — Admin UI pass**
      - Responsive + loading/empty/error states
- [ ] **Day 49 (Mon, 16 Nov 2026) — Review & checkpoint**
      - Full admin walkthrough end to end
      - Commit

## Phase 8: Animation, Accessibility & Performance Polish

*Tue, 17 Nov 2026 – Mon, 23 Nov 2026 · Loading/error/empty states — 5 pts · Code quality & UX — 5 pts*

- [ ] **Day 50 (Tue, 17 Nov 2026) — Framer Motion pass**
      - Fade/scale/slide entrance & exit on every modal and dialog
- [ ] **Day 51 (Wed, 18 Nov 2026) — Route-level transitions**
      - Plus hover/focus/tap micro-interactions
- [ ] **Day 52 (Thu, 19 Nov 2026) — Full responsive QA**
      - Mobile, tablet, laptop, large desktop — every page
- [ ] **Day 53 (Fri, 20 Nov 2026) — Accessibility pass**
      - Keyboard nav, focus rings, aria labels, prefers-reduced-motion
- [ ] **Day 54 (Sat, 21 Nov 2026) — Performance pass**
      - Lazy-load images/routes, check for layout shift
- [ ] **Day 55 (Sun, 22 Nov 2026) — Cross-browser & edge-case bug bash**
      - Empty API results, offline, bad routes
- [ ] **Day 56 (Mon, 23 Nov 2026) — Review & checkpoint**
      - Full app vs. PRD §7 functional checklist
      - Commit

## Phase 9: Submission Prep & Deploy

*Tue, 24 Nov 2026 – Sat, 28 Nov 2026 · Whole-project polish & delivery*

- [ ] **Day 57 (Tue, 24 Nov 2026) — Write the README**
      - Chosen API, setup steps, .env.example
- [ ] **Day 58 (Wed, 25 Nov 2026) — Capture screenshots / short demo**
      - Main user flow and admin flow
- [ ] **Day 59 (Thu, 26 Nov 2026) — Deploy**
      - Vercel/Netlify, verify prod env vars, live smoke test
- [ ] **Day 60 (Fri, 27 Nov 2026) — Final rubric self-grade**
      - Score yourself against the 100-mark table, patch gaps
- [ ] **Day 61 (Sat, 28 Nov 2026) — Final commit & submit**
      - Tag the release, submit

