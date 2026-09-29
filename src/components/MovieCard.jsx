import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useFavourites } from '../context/FavouritesContext'

function MovieCard({ movie }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const favourite = isFavourite(movie.id)

  return (
    <div>
      <div className="group relative overflow-hidden rounded-xl">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={movie.poster}
            alt={movie.title}
            className="aspect-[2/3] w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleFavourite(movie.id)}
          aria-pressed={favourite}
          aria-label={favourite ? `Remove ${movie.title} from favourites` : `Add ${movie.title} to favourites`}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
            favourite ? 'bg-brand-amber text-slate-950' : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <Heart className="h-4 w-4" fill={favourite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2">
        <Link
          to={`/movie/${movie.id}`}
          className="block truncate text-sm font-semibold text-white hover:text-brand-amber"
        >
          {movie.shortTitle}
        </Link>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">{movie.genres.join(', ')}</span>
          <span className="ml-2 flex shrink-0 items-center gap-1 text-slate-300">
            <Star className="h-3 w-3 fill-current text-brand-amber" aria-hidden="true" />
            {movie.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
