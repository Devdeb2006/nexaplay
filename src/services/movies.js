const API_BASE = import.meta.env.VITE_MOVIES_API_URL || 'http://localhost:4000'

async function request(path) {
  let response
  try {
    response = await fetch(`${API_BASE}${path}`)
  } catch {
    throw new Error(
      "Couldn't reach the local movie database. Run \"npm run server\" in another terminal."
    )
  }
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`)
  }
  return response.json()
}

export function getMovies() {
  return request('/movies')
}

export function getMovieById(id) {
  return request(`/movies/${id}`)
}
