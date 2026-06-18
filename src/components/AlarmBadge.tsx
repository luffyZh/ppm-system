import type { AlarmType } from '../utils/types'
import { useTheme } from '../utils/theme'

const meta: Record<
  AlarmType,
  { label: string; tone: 'red' | 'amber' | 'cyan' | 'violet' }
> = {
  INTRUSION: { label: '闯入', tone: 'red' },
  LOITERING: { label: '徘徊', tone: 'amber' },
  FALL_SUSPECTED: { label: '疑似跌倒', tone: 'violet' },
  PASS_BY: { label: '人员经过', tone: 'cyan' },
  SNEAK_PHOTO_SUSPECTED: { label: '疑似偷拍', tone: 'red' },
  NO_MOTION: { label: '长静止', tone: 'cyan' },
}

export function AlarmBadge(props: { type: AlarmType }) {
  const m = meta[props.type]
  const { theme } = useTheme()
  const cls =
    m.tone === 'red'
      ? theme === 'light'
        ? 'border-red-200 bg-red-50 text-red-700'
        : 'border-red-400/30 bg-red-500/10 text-red-100'
      : m.tone === 'amber'
        ? theme === 'light'
          ? 'border-amber-200 bg-amber-50 text-amber-700'
          : 'border-amber-300/25 bg-amber-400/10 text-amber-100'
        : m.tone === 'violet'
          ? theme === 'light'
            ? 'border-violet-200 bg-violet-50 text-violet-700'
            : 'border-violet-300/25 bg-violet-400/10 text-violet-100'
          : theme === 'light'
            ? 'border-cyan-200 bg-cyan-50 text-cyan-700'
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
