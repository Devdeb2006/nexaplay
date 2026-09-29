import useMovies from '../hooks/useMovies'
import { useFavourites } from '../context/FavouritesContext'
import MovieCard from '../components/MovieCard'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

function Favourites() {
  const { movies, status, error } = useMovies()
  const { ids } = useFavourites()

  const favourites = movies.filter((movie) => ids.has(movie.id))

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <h1 className="font-display text-4xl tracking-wide text-white">Favourites</h1>
      <p className="mt-1 text-sm text-slate-400">Movies you've saved, kept on this device for now.</p>

      <div className="mt-8">
        {status === 'loading' && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full" />
            ))}
          </div>
        )}

        {status === 'error' && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {status === 'success' && favourites.length === 0 && (
          <EmptyState message="Nothing saved yet. Tap the heart on any movie to add it here." />
        )}

        {status === 'success' && favourites.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favourites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favourites
