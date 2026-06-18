import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { alarms } from '../mock-data/alarms'
import { devices } from '../mock-data/devices'
import { Card } from '../components/Card'
import { Room3DView } from '../components/Room3DView'
import { formatTime } from '../utils/format'
import dvsHandVideo from '../assets/video/dvs-hand.mp4'
import dvsPeopleVideo from '../assets/video/dvs-people.mp4'
import { useTheme } from '../utils/theme'

function getAlarmTypeLabel(alarm: (typeof alarms)[number]) {
  return alarm.type === 'PASS_BY'
    ? `人员经过${alarm.peopleCount ? `（${alarm.peopleCount}人）` : ''}`
    : alarm.type === 'SNEAK_PHOTO_SUSPECTED'
      ? '疑似偷拍'
      : alarm.type === 'FALL_SUSPECTED'
        ? '疑似跌倒'
        : alarm.type === 'INTRUSION'
          ? '闯入'
          : alarm.type === 'LOITERING'
            ? '徘徊'
            : '长静止'
}

function getAlarmStatusMeta(
  status: (typeof alarms)[number]['status'],
  theme: 'dark' | 'light',
) {
  return status === 'OPEN'
    ? {
        label: '未处理',
        className:
          theme === 'light'
            ? 'border-rose-200 bg-rose-50 text-rose-700'
            : 'border-rose-400/25 bg-rose-500/10 text-rose-100',
      }
    : status === 'ACKED'
      ? {
          label: '已确认',
          className:
            theme === 'light'
              ? 'border-amber-200 bg-amber-50 text-amber-700'
              : 'border-amber-300/25 bg-amber-400/10 text-amber-100',
        }
      : {
          label: '已关闭',
          className:
            theme === 'light'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
        }
}

function getVideoSrc(alarm: (typeof alarms)[number] | undefined) {
  if (!alarm) return dvsPeopleVideo
  if (alarm.type === 'SNEAK_PHOTO_SUSPECTED') return dvsHandVideo
  return dvsPeopleVideo
}

function getInfoChipClass(theme: 'dark' | 'light') {
  return theme === 'light'
    ? 'border-slate-200 bg-white/90 text-slate-700'
    : 'border-white/10 bg-white/[0.02] text-zinc-300'
}

function getTimelineItemClass(theme: 'dark' | 'light', active: boolean) {
  if (active) {
    return theme === 'light'
      ? 'border-cyan-200 bg-cyan-50'
      : 'border-cyan-300/25 bg-cyan-400/10'
  }

  return theme === 'light'
    ? 'border-slate-200 bg-white/85 hover:bg-slate-50'
    : 'border-white/10 bg-black/20 hover:bg-white/[0.04]'
}

export function DashboardPage() {
  const { theme } = useTheme()
  const openCount = useMemo(() => alarms.filter((a) => a.status === 'OPEN').length, [])
  const onlineCount = useMemo(() => devices.filter((d) => d.online).length, [])
  const trackedPeople = useMemo(
    () => [
      { id: 'p-01', x: -0.95, z: 0.65, state: 'focus' as const },
      { id: 'p-02', x: 0.18, z: -0.12, state: 'tracking' as const },
      { id: 'p-03', x: 1.02, z: 0.52, state: 'tracking' as const },
    ],
    [],
  )
  const timelineAlarms = useMemo(
    () =>
      [...alarms]
        .sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()),
    [],
  )
  const [selectedId, setSelectedId] = useState(() => timelineAlarms[0]?.id ?? '')
  const selected = useMemo(() => {
    return timelineAlarms.find((a) => a.id === selectedId) ?? timelineAlarms[0]
  }, [selectedId, timelineAlarms])
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
    <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)] gap-6 overflow-hidden xl:grid-cols-[minmax(0,3fr)_minmax(360px,1fr)]">
      <div className="flex h-full min-h-0 min-w-0">
        <Card
          title="3D 房间态势（示意）"
          right={
            <span className="text-[color:var(--text-muted)]">
              Web3D · 4角点位 · 告警高亮
            </span>
          }
          className="flex h-full min-h-0 w-full flex-col"
          bodyClassName="flex-1 min-h-0 p-6"
        >
          <Room3DView
            zones={zones}
            people={trackedPeople}
            theme={theme}
            className="h-full min-h-0"
            viewportClassName="h-full min-h-0"
          />
        </Card>
      </div>

      <div className="flex h-full min-h-0 min-w-0 flex-col gap-4">
        <Card
          title="告警监看"
          right={
            <div className="flex items-center gap-2">
              <span
                className={[
                  'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                  openCount > 0
                    ? theme === 'light'
                      ? 'border-rose-200 bg-rose-50 text-rose-700'
                      : 'border-rose-400/25 bg-rose-500/10 text-rose-100'
                    : theme === 'light'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
                ].join(' ')}
              >
                未处理 {openCount}
              </span>
              <span
                className={[
                  'rounded-full border px-2.5 py-1 text-[11px]',
                  theme === 'light'
                    ? 'border-cyan-200 bg-cyan-50 text-cyan-700'
                    : 'border-cyan-400/15 bg-cyan-400/10 text-cyan-100',
                ].join(' ')}
              >
                在线 {onlineCount}
              </span>
              <span
                className={[
                  'rounded-full border px-2.5 py-1 text-[11px]',
                  getInfoChipClass(theme),
                ].join(' ')}
              >
                占位视频
              </span>
            </div>
          }
          className="shrink-0"
          bodyClassName="pt-0"
        >
          <section
            className={[
              'relative shrink-0 overflow-hidden rounded-2xl border',
              theme === 'light'
                ? 'border-slate-200 bg-slate-950/8'
                : 'border-white/10 bg-black/25',
            ].join(' ')}
          >
            <div className="relative h-[clamp(320px,42vh,440px)]">
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-90 [filter:brightness(1.08)_contrast(1.02)_saturate(1.06)]"
                src={getVideoSrc(selected)}
                muted
                loop
                autoPlay
                playsInline
              />
              <div
                className={[
                  'pointer-events-none absolute inset-0',
                  theme === 'light'
                    ? 'bg-[linear-gradient(180deg,rgba(248,250,252,0.08)_0%,rgba(255,255,255,0.18)_55%,rgba(255,255,255,0.56)_100%)]'
                    : 'bg-[linear-gradient(180deg,rgba(4,8,16,0.20)_0%,rgba(4,8,16,0.45)_58%,rgba(4,8,16,0.78)_100%)]',
                ].join(' ')}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_8px)] opacity-40" />
              <div
                className={[
                  'pointer-events-none absolute inset-0',
                  theme === 'light'
                    ? 'bg-[radial-gradient(900px_360px_at_18%_22%,rgba(34,211,238,0.08),transparent_55%),radial-gradient(900px_360px_at_92%_30%,rgba(244,63,94,0.08),transparent_58%)]'
                    : 'bg-[radial-gradient(900px_360px_at_18%_22%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(900px_360px_at_92%_30%,rgba(244,63,94,0.12),transparent_58%)]',
                ].join(' ')}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex-1 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-base)]">
                        <span className="inline-flex size-2 rounded-full bg-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.70)]" />
                        视频监看窗
                        <span className="text-[color:var(--text-soft)]">Privacy Masked</span>
                      </div>
                      <div className="mt-2 text-base font-semibold tracking-wide text-[color:var(--text-strong)]">
                        {selected ? getAlarmTypeLabel(selected) : '—'}
                      </div>
                      <div className="mt-1 text-xs text-[color:var(--text-base)]">
                        {selected ? selected.zone : '—'}
                      </div>
                    </div>

                    {selected && (
                      <div
                        className={[
                          'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                          getAlarmStatusMeta(selected.status, theme).className,
                        ].join(' ')}
                      >
                        {getAlarmStatusMeta(selected.status, theme).label}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={[
                    'border-t px-4 py-3 backdrop-blur',
                    theme === 'light'
                      ? 'border-slate-200 bg-white/78'
                      : 'border-white/10 bg-slate-950/55',
                  ].join(' ')}
                >
                  <div className="grid gap-3 text-xs text-[color:var(--text-base)] sm:grid-cols-2">
                    <div
                      className={[
                        'rounded-xl border px-3 py-2.5',
                        theme === 'light'
                          ? 'border-slate-200 bg-white/92'
                          : 'border-white/10 bg-white/[0.04]',
                      ].join(' ')}
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">设备 ID</div>
                      <div className="mt-1 font-mono text-[13px] text-[color:var(--text-strong)]">
                        {selected ? selected.deviceIds.join(' · ') : '—'}
                      </div>
                    </div>
                    <div
                      className={[
                        'rounded-xl border px-3 py-2.5',
                        theme === 'light'
                          ? 'border-slate-200 bg-white/92'
                          : 'border-white/10 bg-white/[0.04]',
                      ].join(' ')}
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">行为信息</div>
                      <div className="mt-1 text-[13px] text-[color:var(--text-strong)]">
                        {selected ? getAlarmTypeLabel(selected) : '—'}
                        {selected ? (
                          <span className="ml-2 font-mono text-[11px] text-[color:var(--text-soft)]">
                            {(selected.confidence * 100).toFixed(0)}%
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={[
                        'rounded-xl border px-3 py-2.5',
                        theme === 'light'
                          ? 'border-slate-200 bg-white/92'
                          : 'border-white/10 bg-white/[0.04]',
                      ].join(' ')}
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">告警时间</div>
                      <div className="mt-1 font-mono text-[13px] text-[color:var(--text-strong)]">
                        {selected ? formatTime(selected.startAt) : '—'}
                      </div>
                    </div>
                    <div
                      className={[
                        'rounded-xl border px-3 py-2.5',
                        theme === 'light'
                          ? 'border-slate-200 bg-white/92'
                          : 'border-white/10 bg-white/[0.04]',
                      ].join(' ')}
                    >
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">处理结果</div>
                      <div className="mt-1 text-[13px] text-[color:var(--text-strong)]">
                        {selected
                          ? selected.note ??
                            (selected.status === 'OPEN'
                              ? '待人工确认'
                              : getAlarmStatusMeta(selected.status, theme).label)
                          : '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        <Card
          title="告警时间轴"
          right={
            <Link
              to="/alarms"
              className={[
                'rounded-full border px-3 py-1.5 text-xs hover:bg-white/[0.04]',
                getInfoChipClass(theme),
              ].join(' ')}
            >
              查看全部
            </Link>
          }
          className="flex min-h-0 flex-1 flex-col"
          bodyClassName="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-auto pr-1">
            <div className="space-y-2">
              {timelineAlarms.map((a) => {
                const active = a.id === selectedId
                const status = getAlarmStatusMeta(a.status, theme)

                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className={[
                      'group flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
                      getTimelineItemClass(theme, active),
                    ].join(' ')}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            'mt-1 inline-flex size-2 rounded-full',
                            a.status === 'OPEN'
                              ? 'bg-rose-400 shadow-[0_0_16px_rgba(251,113,133,0.65)]'
                              : a.status === 'ACKED'
                                ? 'bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.45)]'
                                : 'bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.40)]',
                          ].join(' ')}
                        />
                        <div className="truncate text-sm font-semibold tracking-wide text-[color:var(--text-strong)]">
                          {getAlarmTypeLabel(a)}
                        </div>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[color:var(--text-muted)]">
                        <span className="font-mono text-[color:var(--text-soft)]">{formatTime(a.startAt)}</span>
                        <span>·</span>
                        <span className="truncate">{a.zone}</span>
                      </div>
                      <div className="mt-1 truncate font-mono text-[11px] text-[color:var(--text-muted)]">
                        {a.deviceIds.join(' · ')}
                      </div>
                    </div>

                    <div
                      className={[
                        'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                        status.className,
                      ].join(' ')}
                    >
                      {status.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
