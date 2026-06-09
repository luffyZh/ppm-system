import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { alarms } from '../mock-data/alarms'
import { devices } from '../mock-data/devices'
import { Card } from '../components/Card'
import { KpiCard } from '../components/KpiCard'
import { Room3DView } from '../components/Room3DView'

export function DashboardPage() {
  const openCount = useMemo(() => alarms.filter((a) => a.status === 'OPEN').length, [])
  const onlineCount = useMemo(() => devices.filter((d) => d.online).length, [])
  const zones = useMemo(() => {
    const openZones = new Set(alarms.filter((a) => a.status === 'OPEN').map((a) => a.zone))
    return [
      {
        zone: '涉密核心区-A',
        tone: openZones.has('涉密核心区-A') ? ('warn' as const) : ('safe' as const),
        label: '涉密核心区-A',
      },
      {
        zone: '浴室-01',
        tone: openZones.has('浴室-01') ? ('warn' as const) : ('safe' as const),
        label: '浴室-01',
      },
    ]
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
      <div className="space-y-6">
        <Card
          title="3D 房间态势（示意）"
          right={
            <span className="text-zinc-500">
              Web3D · 4角点位 · 告警高亮
            </span>
          }
        >
          <Room3DView zones={zones} />
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard
            label="未处理告警"
            value={`${openCount}`}
            hint="低漏报优先 · 辅助告警"
            tone={openCount > 0 ? 'rose' : 'emerald'}
          />
          <KpiCard label="在线设备" value={`${onlineCount}`} hint="DVS/WiFi/EdgeBox" />
          <KpiCard label="对接状态" value="门禁/访客：待联调" hint="Stage2 先做 Webhook" tone="violet" />
        </div>
      </div>

      <Card
        title="告警快照"
        right={
          <Link
            to="/alarms"
            className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.04]"
          >
            查看全部
          </Link>
        }
      >
        <div className="space-y-3">
          {alarms.slice(0, 5).map((a) => (
            <div
              key={a.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-wide text-zinc-100">
                  {a.type === 'FALL_SUSPECTED'
                    ? '疑似跌倒'
                    : a.type === 'INTRUSION'
                      ? '闯入'
                      : a.type === 'LOITERING'
                        ? '徘徊'
                        : '长静止'}
                  <span className="ml-2 text-xs text-zinc-500">{a.zone}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  置信度 {(a.confidence * 100).toFixed(0)}% · {a.deviceIds.join(' · ')}
                </div>
              </div>
              <div
                className={[
                  'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                  a.status === 'OPEN'
                    ? 'border-rose-400/25 bg-rose-500/10 text-rose-100'
                    : a.status === 'ACKED'
                      ? 'border-amber-300/25 bg-amber-400/10 text-amber-100'
                      : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
                ].join(' ')}
              >
                {a.status === 'OPEN' ? '未处理' : a.status === 'ACKED' ? '已确认' : '已关闭'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

