import { Link, useParams } from 'react-router-dom'
import { Play, Heart, Calendar, Star } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import { getMovieById } from '../services/movies'
import { useFavourites } from '../context/FavouritesContext'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function MovieDetails() {
  const { id } = useParams()
  const { data: movie, status, error } = useFetch(() => getMovieById(id), [id])
  const { isFavourite, toggleFavourite } = useFavourites()

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (!movie) return null

  const favourite = isFavourite(movie.id)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="aspect-[2/3] w-full rounded-2xl object-cover shadow-lg shadow-black/40"
        />

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-display text-4xl tracking-wide text-white sm:text-5xl">{movie.title}</h1>
            <p className="mt-1 text-slate-400">{movie.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {formatDate(movie.releaseDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-current text-brand-amber" aria-hidden="true" />
              {movie.rating.toFixed(1)} / 10
            </span>
            <span className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g} className="rounded-full bg-white/10 px-2.5 py-1 text-xs">
                  {g}
                </span>
              ))}
            </span>
          </div>

          <p className="max-w-2xl leading-relaxed text-slate-300">{movie.overview}</p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch now
            </button>
            <button
              type="button"
              onClick={() => toggleFavourite(movie.id)}
              aria-pressed={favourite}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                favourite
                  ? 'border-brand-amber bg-brand-amber text-slate-950'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Heart className="h-4 w-4" fill={favourite ? 'currentColor' : 'none'} aria-hidden="true" />
              {favourite ? 'In favourites' : 'Add to favourites'}
            </button>
          </div>

          <div className="rounded-2xl border border-brand-amber/30 bg-brand-amber/10 p-4 text-sm text-amber-100">
            Full playback is part of an active Streamora subscription.{' '}
            <Link to="/plans" className="font-semibold underline underline-offset-2">
              View plans
            </Link>
            .
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl tracking-wide text-white">Trailer</h2>
        <div className="mt-3 flex aspect-video w-full max-w-2xl items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-sm text-slate-500">
          Trailer video lands here once a licensed source is wired in.
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
