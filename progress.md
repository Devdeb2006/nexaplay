# Progress Log

Record a short entry here before every push. Newest entry on top.

Format:
```
## YYYY-MM-DD — short title
- What changed
- Why
- Anything left unfinished / follow-up needed
```

---

## 2026-09-29 — Routing skeleton (createBrowserRouter)

- Installed react-router-dom, framer-motion, swiper.
- createBrowserRouter route tree lives directly in main.jsx (no separate router.jsx) via RouterProvider; removed the old App.jsx/App.css Vite boilerplate.
- Added src/layouts/RootLayout.jsx (public nav/footer) and AdminLayout.jsx; ProtectedRoute and AdminRoute are pass-through placeholders until AuthContext exists.
- Added placeholder pages for every route in the PRD (Home, Browse, MovieDetails, Register, Login, Favourites, Plans, Payment, ThankYou, Profile, NotFound, and the admin pages).
- Verified `npm run build` and route resolution (/, /browse, /admin) on the dev server.
- Follow-up: ProtectedRoute/AdminRoute need real auth checks once AuthContext lands.

## 2026-09-29 — Status snapshot

**Done**
- Project scaffold: Vite + React 19 + Tailwind CSS (pre-existing).
- 61-day / 9-phase build plan published, mapped to the PRD's 100-mark rubric.
- react-router-dom, framer-motion, swiper installed.
- Full route tree (createBrowserRouter) defined directly in main.jsx — no separate router.jsx.
- RootLayout (public nav/footer) and AdminLayout built.
- ProtectedRoute and AdminRoute guard components in place as pass-through placeholders.
- Placeholder pages created for every PRD route: Home, Browse, MovieDetails, Register, Login, Favourites, Plans, Payment, ThankYou, Profile, NotFound, and the four admin pages.
- Old Vite template files (App.jsx, App.css) removed.
- .env / .env.local added to .gitignore.
- Build and dev-server route resolution both verified.

**Next**
- Finish the global layout / Tailwind theme tokens (brand colors, font families, spacing scale).
- Build the TMDB (or chosen free movie API) service module: fetch wrapper + trending/popular/genres/search/details/videos endpoints.
- Build reusable UI primitives: Button, Skeleton, Spinner, ErrorState, EmptyState.
- Then move into Phase 2 of the build plan: Home page hero, Swiper carousels, MovieCard, search, loading/error states wired to real API data.

## 2026-09-29 — Home page + temporary JSON Server data layer

- Added json-server (devDependency) as a **temporary** stand-in for the movie catalogue while the free movie API isn't wired up yet. `db.json` seeds a `movies` collection (10 well-known films) plus empty `users`/`favourites`/`subscriptions`/`payments`/`watchHistory`/`adminSettings` collections. Run it with `npm run server` (port 4000, separate terminal from `npm run dev`).
- **PRD flag:** the PRD explicitly forbids JSON Server as the final movie-data source. This is scaffolding only — `src/services/movies.js` is the single seam to swap for the real API call later, so nothing else needs to change.
- Poster/backdrop images are real posters pulled from Wikipedia's public REST API (`upload.wikimedia.org`, no key required) — verified each one actually loads before committing the URLs.
- Added `src/services/movies.js` (fetch wrapper) and `src/hooks/useMovies.js` (loading/success/error state).
- Added `src/components/Skeleton.jsx`, `ErrorState.jsx`, `EmptyState.jsx` — reusable loading/error/empty primitives (PRD requirement).
- Rebuilt `RootLayout.jsx` as a left icon sidebar + top search bar (lucide-react icons) to match the approved Home page mockup; the previous top-navbar version is gone.
- Rebuilt `Home.jsx`: hero with poster backdrop, release date/genres, title, Watch now/Trailer buttons, favourite/watch-later toggle buttons, and a Swiper carousel of posters that swaps the featured movie on click.
- Added Tailwind theme tokens: `font-display` (Bebas Neue, via Google Fonts in index.html) for hero titles, `font-sans` (Inter), and `brand.amber` / `brand.navy` colors.
- Verified in an actual browser (Playwright, headless Chromium): screenshots match the mockup, hero swap on carousel click works, favourite toggle works, zero console errors on Home/Browse/Login/Admin.
- Follow-up: `.env` needs `VITE_MOVIES_API_URL` set if json-server ever runs on a non-default port (see `.env.example`); real favourites/watch-later persistence still lands in the Favourites phase of the build plan.

## 2026-09-29 — Added docs/MILESTONES.md

- The two-month build plan only existed as a published web link; added `docs/MILESTONES.md` so the plan lives in the project itself, with a link back to the interactive checklist version for daily check-off.
- No code changes.

## 2026-09-29 — Push attempt failed (permissions)

- `git push origin main` was rejected: GitHub returned 403, "Permission to Devdeb2006/nexaplay.git denied to CHIBUZOR-coder." The authenticated account doesn't have write access to this remote.
- Nothing pushed yet — the commit is local only. Needs the repo owner to add CHIBUZOR-coder as a collaborator, or the remote needs to point at a repo this account can push to (e.g. a personal fork).
