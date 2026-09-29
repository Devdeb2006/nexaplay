import { createContext, useContext, useEffect, useState } from 'react'

const FavouritesContext = createContext(null)
const STORAGE_KEY = 'streamora-favourites'

export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
    } catch {
      // private browsing or storage disabled — favourites just won't persist
    }
  }, [ids])

  function toggleFavourite(id) {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function isFavourite(id) {
    return ids.has(id)
  }

  return (
    <FavouritesContext.Provider value={{ ids, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

// Context + provider + hook live together by design (the standard React
// pattern); this only affects Fast Refresh granularity, not correctness.
// eslint-disable-next-line react-refresh/only-export-components
export function useFavourites() {
  const ctx = useContext(FavouritesContext)
  if (!ctx) throw new Error('useFavourites must be used within a FavouritesProvider')
  return ctx
}
