import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Grid2x2, Home, Film, Heart, Layers, UserRound, Search, SlidersHorizontal } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/browse', label: 'Browse', icon: Film },
  { to: '/favourites', label: 'Favourites', icon: Heart },
  { to: '/plans', label: 'Plans', icon: Layers },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

function sidebarLinkClass({ isActive }) {
  return `flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
    isActive ? 'bg-brand-amber text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-white'
  }`
}

function RootLayout() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearchSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) navigate(`/browse?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="flex w-20 shrink-0 flex-col items-center gap-3 border-r border-white/5 py-6">
        <NavLink to="/" className="mb-3 flex h-11 w-11 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white">
          <Grid2x2 className="h-5 w-5" aria-hidden="true" />
        </NavLink>
        <nav className="flex flex-col items-center gap-2">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={sidebarLinkClass} aria-label={label} title={label}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-4 px-6 py-5 sm:justify-between">
          <form onSubmit={handleSearchSubmit} className="hidden max-w-sm flex-1 items-center gap-2 rounded-full bg-white/5 px-4 py-2 sm:flex">
            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for movie"
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Search filters"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="flex items-center gap-3">
            <NavLink to="/login" className="text-sm font-medium text-slate-300 hover:text-white">
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="rounded-full bg-brand-amber px-4 py-1.5 text-sm font-semibold text-slate-950 hover:brightness-110"
            >
              Sign up
            </NavLink>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout
