import { useParams } from 'react-router-dom'

function MovieDetails() {
  const { id } = useParams()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold text-white">Movie Details</h1>
      <p className="mt-2 text-slate-400">Details for movie id {id} land here.</p>
    </section>
  )
}

export default MovieDetails
