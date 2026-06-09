export function KpiCard(props: {
  label: string
  value: string
  hint?: string
  tone?: 'cyan' | 'rose' | 'emerald' | 'violet'
}) {
  const tone =
    props.tone === 'rose'
      ? 'from-rose-400/20 via-rose-400/0 to-transparent text-rose-100'
      : props.tone === 'emerald'
        ? 'from-emerald-400/20 via-emerald-400/0 to-transparent text-emerald-100'
        : props.tone === 'violet'
          ? 'from-violet-400/20 via-violet-400/0 to-transparent text-violet-100'
          : 'from-cyan-300/20 via-cyan-300/0 to-transparent text-cyan-100'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">
      <div className={['pointer-events-none absolute inset-0 bg-gradient-to-br', tone].join(' ')} />
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          {props.label}
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
          {props.value}
        </div>
        {props.hint && <div className="mt-1 text-xs text-zinc-500">{props.hint}</div>}
      </div>
    </div>
  )
}

