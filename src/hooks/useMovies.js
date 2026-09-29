import useFetch from './useFetch'
import { getMovies } from '../services/movies'

function useMovies() {
  const { data, status, error } = useFetch(getMovies, [])
  return { movies: data ?? [], status, error }
}

export default useMovies
