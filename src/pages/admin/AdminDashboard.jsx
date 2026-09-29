import useFetch from '../../hooks/useFetch'
import useMovies from '../../hooks/useMovies'
import { getUsers, getSubscriptions, getPayments } from '../../services/adminData'
import { useFavourites } from '../../context/FavouritesContext'
import Skeleton from '../../components/Skeleton'

function StatCard({ label, value, status }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      {status === 'loading' && <Skeleton className="mt-2 h-8 w-16" />}
      {status === 'error' && <p className="mt-1 text-sm text-red-400">Unavailable</p>}
      {status === 'success' && <p className="mt-1 text-3xl font-bold text-white">{value}</p>}
    </div>
  )
}

function AdminDashboard() {
  const { movies, status: movieStatus } = useMovies()
  const { data: users, status: userStatus } = useFetch(getUsers, [])
  const { data: subscriptions, status: subStatus } = useFetch(getSubscriptions, [])
  const { data: payments, status: paymentStatus } = useFetch(getPayments, [])
  const { ids: favouriteIds } = useFavourites()

  return (
    <section>
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Live counts from the local data layer.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Catalogue" value={movies.length} status={movieStatus} />
        <StatCard label="Users" value={users?.length ?? 0} status={userStatus} />
        <StatCard label="Subscriptions" value={subscriptions?.length ?? 0} status={subStatus} />
        <StatCard label="Payments" value={payments?.length ?? 0} status={paymentStatus} />
        <StatCard label="Favourites (this device)" value={favouriteIds.size} status="success" />
      </div>
    </section>
  )
}

export default AdminDashboard
