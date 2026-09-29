import { useEffect, useState } from 'react'
import { getMovies } from '../services/movies'

function useMovies() {
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setStatus('loading')
    getMovies()
      .then((data) => {
        if (cancelled) return
        setMovies(data)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { movies, status, error }
}

export default useMovies
