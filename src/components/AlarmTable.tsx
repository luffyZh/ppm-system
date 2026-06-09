import { useMemo, useState } from 'react'
import type { AlarmEvent, AlarmStatus } from '../utils/types'
import { clamp01, formatTime } from '../utils/format'
import { AlarmBadge } from './AlarmBadge'
import { ConfirmDialog } from './ConfirmDialog'

function StatusPill(props: { status: AlarmStatus }) {
  const cls =
    props.status === 'OPEN'
      ? 'border-rose-400/25 bg-rose-500/10 text-rose-100'
      : props.status === 'ACKED'
        ? 'border-amber-300/25 bg-amber-400/10 text-amber-100'
        : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100'

  const label =
    props.status === 'OPEN' ? '未处理' : props.status === 'ACKED' ? '已确认' : '已关闭'

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold',
        cls,
      ].join(' ')}
    >
      {label}
    </span>
  )
}

export function AlarmTable(props: {
  alarms: AlarmEvent[]
  onUpdate: (id: string, patch: Partial<AlarmEvent>) => void
}) {
  const [pending, setPending] = useState<
    | null
    | { id: string; action: 'ACK' | 'CLOSE'; title: string; desc: string }
  >(null)

  const rows = useMemo(() => {
    return [...props.alarms].sort(
      (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
    )
  }, [props.alarms])

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-white/[0.03]">
            <tr className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              <th className="px-4 py-3">类型</th>
              <th className="px-4 py-3">区域</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3">置信度</th>
              <th className="px-4 py-3">时间</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/20">
            {rows.map((a) => (
              <tr key={a.id} className="text-zinc-200">
                <td className="px-4 py-3">
                  <AlarmBadge type={a.type} />
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold tracking-wide">{a.zone}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {a.deviceIds.join(' · ')}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-white/10">
                      <div
                        className="h-1.5 rounded-full bg-cyan-300/70"
                        style={{ width: `${clamp01(a.confidence) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-right font-mono text-xs text-zinc-300">
                      {(clamp01(a.confidence) * 100).toFixed(0)}%
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">
                  {formatTime(a.startAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={a.status !== 'OPEN'}
                      onClick={() =>
                        setPending({
                          id: a.id,
                          action: 'ACK',
                          title: '确认告警',
                          desc: '将告警状态置为“已确认”，并保留审计记录。',
                        })
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      确认
                    </button>
                    <button
                      type="button"
                      disabled={a.status === 'CLOSED'}
                      onClick={() =>
                        setPending({
                          id: a.id,
                          action: 'CLOSE',
                          title: '关闭告警',
                          desc: '关闭后将不再触发重复提示（但可在历史中追溯）。',
                        })
                      }
                      className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      关闭
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  暂无告警
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pending}
        title={pending?.title ?? ''}
        description={pending?.desc}
        confirmText="确定"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (!pending) return
          if (pending.action === 'ACK') {
            props.onUpdate(pending.id, { status: 'ACKED' })
          } else {
            props.onUpdate(pending.id, { status: 'CLOSED', endAt: new Date().toISOString() })
          }
          setPending(null)
        }}
      >
        <div className="text-xs text-zinc-400">
          说明：Stage2 Demo 仅模拟“人工确认/关闭”的产品流程，不涉及原始数据存储。
        </div>
      </ConfirmDialog>
    </>
  )
}

