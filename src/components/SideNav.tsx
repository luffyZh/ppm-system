import { NavLink } from 'react-router-dom'

function NavItem(props: { to: string; label: string; hint: string }) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        [
          'group flex items-center justify-between gap-3 rounded-xl border px-4 py-3',
          'transition',
          isActive
            ? 'border-cyan-300/30 bg-cyan-400/10 text-[color:var(--text-strong)] shadow-[0_0_0_1px_rgba(34,211,238,0.12)]'
            : 'border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] text-[color:var(--text-base)] hover:bg-white/[0.04]',
        ].join(' ')
      }
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold tracking-wide">
          {props.label}
        </div>
        <div className="truncate text-xs text-[color:var(--text-muted)]">{props.hint}</div>
      </div>
      <div className="size-2 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
    </NavLink>
  )
}

export function SideNav() {
  return (
    <aside className="flex h-full flex-col gap-4 border-r border-[color:var(--panel-border)] bg-[color:var(--shell-bg)] px-4 py-5 backdrop-blur-xl">
      <div className="rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] px-4 py-4">
        <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
          EagleEye
        </div>
        <div className="mt-1 text-lg font-semibold tracking-wide text-[color:var(--text-strong)]">
          鹰眼控制台
        </div>
        <div className="mt-2 text-xs text-[color:var(--text-muted)]">
          Stage2 Demo · 纯前端模拟
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <NavItem to="/" label="态势总览" hint="3D 房间态势 + KPI" />
        <NavItem to="/alarms" label="告警中心" hint="闯入/徘徊/疑似跌倒" />
        <NavItem to="/devices" label="设备与点位" hint="DVS/WiFi/EdgeBox" />
      </div>

      <div className="mt-auto rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--panel-bg)] p-4 text-xs text-[color:var(--text-muted)]">
        <div className="font-semibold text-[color:var(--text-base)]">隐私约束</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>不展示人像画面</li>
          <li>不存储原始流</li>
          <li>仅输出事件与指标</li>
        </ul>
      </div>
    </aside>
  )
}
