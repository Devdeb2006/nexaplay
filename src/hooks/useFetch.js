import { useEffect, useState } from 'react'

function useFetch(fetchFn, deps) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    // Resets status when `deps` changes (e.g. a route param), so a new
    // fetch shows loading instead of stale data from the previous one.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus('loading')
    fetchFn()
      .then((result) => {
        if (cancelled) return
        setData(result)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, status, error }
}

export default useFetch
