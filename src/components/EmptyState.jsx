import { Inbox } from 'lucide-react'

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-10 text-center">
      <Inbox className="h-8 w-8 text-slate-500" aria-hidden="true" />
      <p className="max-w-md text-sm text-slate-400">{message}</p>
    </div>
  )
}

export default EmptyState
