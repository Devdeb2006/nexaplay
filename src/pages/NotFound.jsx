import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 rounded-md bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400">
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
