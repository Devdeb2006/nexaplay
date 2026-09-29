import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useMovies from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest rated' },
  { value: 'release', label: 'Newest' },
  { value: 'title', label: 'Title A–Z' },
]

function BrowseSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] w-full" />
      ))}
    </div>
  )
}

function Browse() {
  const { movies, status, error } = useMovies()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [genre, setGenre] = useState('all')
  const [sort, setSort] = useState('rating')

  const genres = useMemo(() => {
    const set = new Set()
    movies.forEach((movie) => movie.genres.forEach((g) => set.add(g)))
    return ['all', ...Array.from(set).sort()]
  }, [movies])

  const filtered = useMemo(() => {
    let list = movies

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((movie) => movie.title.toLowerCase().includes(q))
    }
    if (genre !== 'all') {
      list = list.filter((movie) => movie.genres.includes(genre))
    }

    const sorted = [...list]
    if (sort === 'release') {
      sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    } else if (sort === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      sorted.sort((a, b) => b.rating - a.rating)
    }
    return sorted
  }, [movies, query, genre, sort])

  function handleQueryChange(event) {
    const value = event.target.value
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-white">Browse Movies</h1>
          <p className="mt-1 text-sm text-slate-400">
            {status === 'success' ? `${filtered.length} of ${movies.length} movies` : 'Loading the catalogue…'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Filter by title"
            className="w-48 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-amber"
          />
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-amber"
          >
            {genres.map((g) => (
              <option key={g} value={g} className="bg-slate-900">
                {g === 'all' ? 'All genres' : g}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-amber"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' && <BrowseSkeleton />}

      {status === 'error' && <ErrorState message={error} onRetry={() => window.location.reload()} />}

      {status === 'success' && filtered.length === 0 && (
        <EmptyState message={query ? `No movies match "${query}".` : 'No movies match these filters.'} />
      )}

      {status === 'success' && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Browse
