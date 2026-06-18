import { useLocation } from 'react-router-dom'
import { useTheme } from '../utils/theme'

const titles: Record<string, string> = {
  '/': '态势总览',
  '/alarms': '告警中心',
  '/devices': '设备与点位',
}

export function TopBar() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? '鹰眼控制台'
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between gap-4 border-b border-[color:var(--panel-border)] bg-[color:var(--shell-bg)] px-6 py-4 backdrop-blur-xl">
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
          隐私防护监控装备 · EagleEye
        </div>
        <div className="truncate text-lg font-semibold tracking-wide text-[color:var(--text-strong)]">
          {title}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] px-3 py-2 text-xs font-semibold text-[color:var(--text-base)] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
        <div className="hidden rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] px-3 py-2 text-xs text-[color:var(--text-soft)] md:block">
          全本地 · 不存原始流 · 事件级输出
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] px-3 py-2">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
          <span className="text-xs text-[color:var(--text-base)]">系统运行中</span>
        </div>
      </div>
    </header>
  )
}
