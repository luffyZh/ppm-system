import type { PropsWithChildren } from 'react'

export function Card(
  props: PropsWithChildren<{
    title?: string
    right?: React.ReactNode
    className?: string
    bodyClassName?: string
  }>,
) {
  return (
    <section
      className={[
        'group relative overflow-hidden rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)]',
        'shadow-[var(--panel-shadow)]',
        'backdrop-blur-xl',
        props.className ?? '',
      ].join(' ')}
    >
      {/* 轻微的“能量边缘” */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(600px_250px_at_20%_0%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(500px_260px_at_90%_20%,rgba(168,85,247,0.14),transparent_60%)]" />
      </div>

      {(props.title || props.right) && (
        <header className="relative flex items-center justify-between gap-3 border-b border-[color:var(--panel-border)] px-5 py-4">
          <div className="text-sm font-semibold tracking-wide text-[color:var(--text-strong)]">
            {props.title}
          </div>
          <div className="text-xs text-[color:var(--text-soft)]">{props.right}</div>
        </header>
      )}

      <div className={['relative px-5 py-4', props.bodyClassName ?? ''].join(' ')}>
        {props.children}
      </div>
    </section>
  )
}
