import useFetch from '../../hooks/useFetch'
import { getSubscriptions, getPayments } from '../../services/adminData'
import Skeleton from '../../components/Skeleton'
import ErrorState from '../../components/ErrorState'
import EmptyState from '../../components/EmptyState'

function DataSection({ title, status, error, data, columns }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3">
        {status === 'loading' && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}
        {status === 'error' && <ErrorState message={error} onRetry={() => window.location.reload()} />}
        {status === 'success' && data.length === 0 && (
          <EmptyState message={`No ${title.toLowerCase()} recorded yet.`} />
        )}
        {status === 'success' && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] overflow-hidden rounded-xl text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="px-4 py-3">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 text-slate-300">
                        {row[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function AdminSubscriptions() {
  const subs = useFetch(getSubscriptions, [])
  const payments = useFetch(getPayments, [])

  return (
    <section className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Subscriptions & Payments</h1>
        <p className="mt-1 text-sm text-slate-400">Test-mode records from the local data layer.</p>
      </div>

      <DataSection
        title="Subscriptions"
        status={subs.status}
        error={subs.error}
        data={subs.data ?? []}
        columns={[
          { key: 'userEmail', label: 'User' },
          { key: 'plan', label: 'Plan' },
          { key: 'status', label: 'Status' },
          { key: 'startedAt', label: 'Started' },
        ]}
      />

      <DataSection
        title="Payments"
        status={payments.status}
        error={payments.error}
        data={payments.data ?? []}
        columns={[
          { key: 'reference', label: 'Reference' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
      />
    </section>
  )
}

export default AdminSubscriptions
