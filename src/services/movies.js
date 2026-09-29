import { request } from './apiClient'

export function getMovies() {
  return request('/movies')
}

export function getMovieById(id) {
  return request(`/movies/${id}`)
}
