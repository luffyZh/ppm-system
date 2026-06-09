import type { PropsWithChildren } from 'react'

export function Card(
  props: PropsWithChildren<{
    title?: string
    right?: React.ReactNode
    className?: string
  }>,
) {
  return (
    <section
      className={[
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_70px_-30px_rgba(0,0,0,0.9)]',
        'backdrop-blur-xl',
        props.className ?? '',
      ].join(' ')}
    >
      {/* 轻微的“能量边缘” */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(600px_250px_at_20%_0%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(500px_260px_at_90%_20%,rgba(168,85,247,0.14),transparent_60%)]" />
      </div>

      {(props.title || props.right) && (
        <header className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold tracking-wide text-zinc-200">
            {props.title}
          </div>
          <div className="text-xs text-zinc-400">{props.right}</div>
        </header>
      )}

      <div className="relative px-5 py-4">{props.children}</div>
    </section>
  )
}

