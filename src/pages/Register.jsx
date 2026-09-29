import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/FormField'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match."
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
      <h1 className="font-display text-4xl tracking-wide text-white">Create your account</h1>
      <p className="mt-2 text-sm text-slate-400">
        Already have one?{' '}
        <Link to="/login" className="text-brand-amber hover:underline">
          Log in
        </Link>
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-200">
          Form looks good. Account creation connects to real storage once AuthContext lands (see the build plan).
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <FormField label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
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
          <FormField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-amber px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
          >
            Create account
          </button>
        </form>
      )}
    </div>
  )
}

export default Register
