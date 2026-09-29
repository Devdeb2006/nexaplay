import { useState } from 'react'
import FormField from '../../components/FormField'

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 text-slate-100">
      <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-400">Restricted to Streamora admin accounts.</p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-200">
          Form looks good. Role-based auth connects once AuthContext lands (see the build plan).
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <FormField label="Admin email" name="email" type="email" value={form.email} onChange={handleChange} />
          <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-amber px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
          >
            Log in
          </button>
        </form>
      )}
    </section>
  )
}

export default AdminLogin
