import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/FormField'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Enter your password.'
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center px-6 py-12">
      <h1 className="font-display text-4xl tracking-wide text-white">Log in</h1>
      <p className="mt-2 text-sm text-slate-400">
        New here?{' '}
        <Link to="/register" className="text-brand-amber hover:underline">
          Create an account
        </Link>
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-200">
          Form looks good. Real authentication connects once AuthContext lands (see the build plan).
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-amber px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
          >
            Log in
          </button>
        </form>
      )}
    </div>
  )
}

export default Login
