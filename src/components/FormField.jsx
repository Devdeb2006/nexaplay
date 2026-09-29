function FormField({ label, name, type = 'text', value, onChange, error }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded-lg border bg-white/5 px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-brand-amber'
        }`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  )
}

export default FormField
