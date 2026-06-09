import type { Device } from '../utils/types'
import { formatAgo } from '../utils/format'

function KindPill(props: { kind: Device['kind'] }) {
  const label = props.kind === 'DVS' ? 'DVS' : props.kind === 'WIFI' ? 'WiFi' : 'EdgeBox'
  const cls =
    props.kind === 'DVS'
      ? 'border-violet-300/25 bg-violet-400/10 text-violet-100'
      : props.kind === 'WIFI'
        ? 'border-cyan-300/25 bg-cyan-400/10 text-cyan-100'
        : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100'
  return (
    <span className={['rounded-full border px-2.5 py-1 text-[11px] font-semibold', cls].join(' ')}>
      {label}
    </span>
  )
}

export function DeviceList(props: { devices: Device[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-white/[0.03]">
          <tr className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            <th className="px-4 py-3">设备</th>
            <th className="px-4 py-3">类型</th>
            <th className="px-4 py-3">区域</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3 text-right">心跳</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-black/20">
          {props.devices.map((d) => (
            <tr key={d.id} className="text-zinc-200">
              <td className="px-4 py-3">
                <div className="font-semibold tracking-wide text-zinc-100">{d.name}</div>
                <div className="mt-1 font-mono text-xs text-zinc-500">{d.id}</div>
              </td>
              <td className="px-4 py-3">
                <KindPill kind={d.kind} />
              </td>
              <td className="px-4 py-3 font-semibold text-zinc-200">{d.zone}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={[
                      'size-2 rounded-full',
                      d.online
                        ? 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]'
                        : 'bg-zinc-500',
                    ].join(' ')}
                    aria-label={d.online ? 'online' : 'offline'}
                  />
                  <span className="text-xs text-zinc-300">{d.online ? '在线' : '离线'}</span>
                </span>
              </td>
              <td className="px-4 py-3 text-right font-mono text-xs text-zinc-400">
                {formatAgo(d.lastSeenAt)}
              </td>
            </tr>
          ))}

          {props.devices.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                暂无设备
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

