import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

function ThankYou() {
  const location = useLocation()
  const plan = location.state?.plan

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
      <CheckCircle2 className="h-14 w-14 text-emerald-400" aria-hidden="true" />
      <h1 className="mt-4 font-display text-4xl tracking-wide text-white">Payment successful</h1>
      <p className="mt-2 text-slate-400">
        {plan ? `Your ${plan.name} subscription is now active.` : 'Your subscription is now active.'}
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          to="/browse"
          className="rounded-full bg-brand-amber px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
        >
          Start watching
        </Link>
        <Link
          to="/profile"
          state={{ plan }}
          className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          Go to profile
        </Link>
      </div>
    </div>
  )
}

export default ThankYou
