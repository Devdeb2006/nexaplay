import useFetch from '../../hooks/useFetch'
import { getUsers } from '../../services/adminData'
import Skeleton from '../../components/Skeleton'
import ErrorState from '../../components/ErrorState'
import EmptyState from '../../components/EmptyState'

function AdminUsers() {
  const { data: users, status, error } = useFetch(getUsers, [])

  return (
    <section>
      <h1 className="text-3xl font-bold text-white">User Management</h1>
      <p className="mt-1 text-sm text-slate-400">Accounts stored in the local data layer.</p>

      <div className="mt-6">
        {status === 'loading' && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}

        {status === 'error' && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {status === 'success' && users.length === 0 && (
          <EmptyState message="No users have registered yet. They'll show up here once Register writes to the local data layer." />
        )}

        {status === 'success' && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] overflow-hidden rounded-xl text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-white">{user.name}</td>
                    <td className="px-4 py-3 text-slate-400">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                        {user.status ?? 'active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminUsers
