import { useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': '态势总览',
  '/alarms': '告警中心',
  '/devices': '设备与点位',
}

export function TopBar() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? '鹰眼控制台'

  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl">
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">
          隐私防护监控装备 · EagleEye
        </div>
        <div className="truncate text-lg font-semibold tracking-wide text-zinc-100">
          {title}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400 md:block">
          全本地 · 不存原始流 · 事件级输出
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
          <span className="text-xs text-zinc-300">系统运行中</span>
        </div>
      </div>
    </header>
  )
}

