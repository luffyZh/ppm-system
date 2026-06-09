import type { AlarmType } from '../utils/types'

const meta: Record<
  AlarmType,
  { label: string; tone: 'red' | 'amber' | 'cyan' | 'violet' }
> = {
  INTRUSION: { label: '闯入', tone: 'red' },
  LOITERING: { label: '徘徊', tone: 'amber' },
  FALL_SUSPECTED: { label: '疑似跌倒', tone: 'violet' },
  NO_MOTION: { label: '长静止', tone: 'cyan' },
}

export function AlarmBadge(props: { type: AlarmType }) {
  const m = meta[props.type]
  const cls =
    m.tone === 'red'
      ? 'border-red-400/30 bg-red-500/10 text-red-200'
      : m.tone === 'amber'
        ? 'border-amber-300/25 bg-amber-400/10 text-amber-100'
        : m.tone === 'violet'
          ? 'border-violet-300/25 bg-violet-400/10 text-violet-100'
          : 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100'

  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        'tracking-wide',
        cls,
      ].join(' ')}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {m.label}
    </span>
  )
}

