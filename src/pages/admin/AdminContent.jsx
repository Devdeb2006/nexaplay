import { useState } from 'react'
import useMovies from '../../hooks/useMovies'
import Skeleton from '../../components/Skeleton'
import ErrorState from '../../components/ErrorState'

function AdminContent() {
  const { movies, status, error } = useMovies()
  const [featuredIds, setFeaturedIds] = useState(() => new Set())

  function toggleFeatured(id) {
    setFeaturedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-white">Content Management</h1>
      <p className="mt-1 text-sm text-slate-400">
        Choose which catalogue titles are promoted as featured on Home. The catalogue itself always comes from the
        movie API.
      </p>

      <div className="mt-6">
        {status === 'loading' && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        )}

        {status === 'error' && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {status === 'success' && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] overflow-hidden rounded-xl text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Genres</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={movie.poster} alt="" className="h-10 w-7 rounded object-cover" />
                        <span className="text-white">{movie.shortTitle}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{movie.genres.join(', ')}</td>
                    <td className="px-4 py-3 text-slate-400">{movie.rating.toFixed(1)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(movie.id)}
                        aria-pressed={featuredIds.has(movie.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          featuredIds.has(movie.id)
                            ? 'bg-brand-amber text-slate-950'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        {featuredIds.has(movie.id) ? 'Featured' : 'Mark featured'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminContent
