import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const plan = location.state?.plan

  if (!plan) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="font-display text-3xl tracking-wide text-white">Payment</h1>
        <p className="mt-3 text-slate-400">Pick a plan first so we know what you're paying for.</p>
        <Link
          to="/plans"
          className="mt-6 inline-block rounded-full bg-brand-amber px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
        >
          View plans
        </Link>
      </div>
    )
  }

  function handlePay() {
    navigate('/thank-you', { state: { plan } })
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-3xl tracking-wide text-white">Payment Summary</h1>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Plan</span>
          <span className="font-medium text-white">{plan.name}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
          <span>Billing</span>
          <span className="font-medium text-white">{plan.cadence}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-slate-400">Total due today</span>
          <span className="text-2xl font-bold text-white">&#8358;{plan.price.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePay}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-amber px-5 py-3 text-sm font-semibold text-slate-950 hover:brightness-110"
      >
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Pay with Flutterwave (test mode)
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Test mode only — no real card is charged. The live Flutterwave checkout wires in during the payment phase of
        the build plan.
      </p>
    </div>
  )
}

export default Payment
