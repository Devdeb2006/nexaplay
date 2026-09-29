import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, Heart, Bookmark } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

import useMovies from '../hooks/useMovies'
import { useFavourites } from '../context/FavouritesContext'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function HomeSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-10 pt-4">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-5 w-56" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="h-11 w-28 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-28 shrink-0 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function Home() {
  const { movies, status, error } = useMovies()
  const { isFavourite, toggleFavourite } = useFavourites()
  const [selectedId, setSelectedId] = useState(null)
  const [watchLaterIds, setWatchLaterIds] = useState(() => new Set())

  const featured = useMemo(() => {
    if (!movies.length) return null
    return movies.find((movie) => movie.id === selectedId) ?? movies[0]
  }, [movies, selectedId])

  function toggleWatchLater(id) {
    setWatchLaterIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (status === 'loading') return <HomeSkeleton />

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  if (!featured) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <EmptyState message="No movies yet. Add some to db.json and restart json-server." />
      </div>
    )
  }

  const isSaved = isFavourite(featured.id)
  const isWatchLater = watchLaterIds.has(featured.id)

  return (
    <div className="mx-auto max-w-6xl px-6 pb-10 pt-4">
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <img
            src={featured.backdrop}
            alt=""
            className="h-full w-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative flex min-h-[26rem] flex-col justify-center gap-4 px-8 py-10 sm:min-h-[30rem] sm:px-12 md:max-w-lg">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span>{formatDate(featured.releaseDate)}</span>
            <span className="text-slate-500">&bull;</span>
            <span className="lowercase">{featured.genres.join(', ')}</span>
          </div>

          <h1 className="font-display text-6xl leading-none tracking-wide text-white sm:text-7xl">
            {featured.shortTitle}
          </h1>

          <p className="text-slate-300">{featured.tagline}</p>

          <div className="mt-2 flex items-center gap-3">
            <Link
              to={`/movie/${featured.id}`}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch now
            </Link>
            <Link
              to={`/movie/${featured.id}`}
              className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              Trailer
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex justify-end gap-3 px-8 pb-6 sm:absolute sm:bottom-6 sm:right-6 sm:px-0 sm:pb-0">
          <button
            type="button"
            onClick={() => toggleFavourite(featured.id)}
            aria-pressed={isSaved}
            aria-label="Add to favourites"
            className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition-colors ${
              isSaved ? 'bg-brand-amber text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => toggleWatchLater(featured.id)}
            aria-pressed={isWatchLater}
            aria-label="Save for later"
            className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition-colors ${
              isWatchLater ? 'bg-brand-amber text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bookmark className="h-5 w-5" fill={isWatchLater ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="mt-8">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode
          mousewheel={{ forceToAxis: true }}
          grabCursor
          slidesPerView="auto"
          spaceBetween={16}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} style={{ width: '8rem' }}>
              <button
                type="button"
                onClick={() => setSelectedId(movie.id)}
                className="group block w-full text-left"
              >
                <div
                  className={`overflow-hidden rounded-xl border-2 transition-colors ${
                    movie.id === featured.id ? 'border-brand-amber' : 'border-transparent'
                  }`}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-44 w-32 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p
                  className={`mt-2 truncate text-xs font-medium ${
                    movie.id === featured.id ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {movie.shortTitle}
                </p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default Home
