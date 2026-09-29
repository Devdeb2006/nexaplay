import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2500,
    cadence: 'per month',
    features: ['Watch on 1 device at a time', 'Standard definition', 'Full catalogue access', 'Cancel anytime'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 4500,
    cadence: 'per month',
    features: ['Watch on 2 devices at a time', 'High definition', 'Full catalogue access', 'Cancel anytime'],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 6500,
    cadence: 'per month',
    features: ['Watch on 4 devices at a time', 'Ultra HD where available', 'Full catalogue access', 'Priority support'],
  },
]

function Plans() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-8">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl tracking-wide text-white">Subscription Plans</h1>
        <p className="mt-2 text-slate-400">All payments run through Flutterwave test mode — no real card is charged.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-6 ${
              plan.highlighted ? 'border-brand-amber bg-brand-amber/5' : 'border-white/10 bg-white/5'
            }`}
          >
            {plan.highlighted && (
              <span className="mb-3 w-fit rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold text-slate-950">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold text-white">
              &#8358;{plan.price.toLocaleString()}
              <span className="text-sm font-normal text-slate-400"> {plan.cadence}</span>
            </p>
            <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate('/payment', { state: { plan } })}
              className={`mt-6 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                plan.highlighted
                  ? 'bg-brand-amber text-slate-950 hover:brightness-110'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
