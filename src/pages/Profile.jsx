import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import Skeleton from '../components/Skeleton'

const MOCK_USER = {
  name: 'Ada Lovelace',
  email: 'ada@streamora.test',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Profile() {
  const { movies, status } = useMovies()
  const location = useLocation()
  const plan = location.state?.plan

  const watchHistory = useMemo(() => movies.slice(0, 4), [movies])

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-amber text-xl font-bold text-slate-950">
            {initials(MOCK_USER.name)}
          </div>
          <div>
            <h1 className="font-display text-3xl tracking-wide text-white">{MOCK_USER.name}</h1>
            <p className="text-sm text-slate-400">{MOCK_USER.email}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Subscription</p>
          <p className="mt-1 font-semibold text-white">{plan ? `${plan.name} · active` : 'No active plan'}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl tracking-wide text-white">Watch history</h2>
        {status === 'loading' && (
          <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full" />
            ))}
          </div>
        )}
        {status === 'success' && watchHistory.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {watchHistory.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
