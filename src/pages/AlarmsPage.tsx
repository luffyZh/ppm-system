import { useMemo, useState } from 'react'
import { Card } from '../components/Card'
import { AlarmTable } from '../components/AlarmTable'
import { alarms as seed } from '../mock-data/alarms'
import type { AlarmEvent } from '../utils/types'

export function AlarmsPage() {
  const [alarms, setAlarms] = useState<AlarmEvent[]>(seed)
  const openCount = useMemo(() => alarms.filter((a) => a.status === 'OPEN').length, [alarms])

  return (
    <div className="space-y-6">
      <Card
        title="告警中心"
        right={<span className="text-zinc-500">未处理：{openCount}</span>}
      >
        <div className="mb-4 text-sm text-zinc-400">
          说明：本 Demo 仅模拟 Stage2 的两类核心能力（闯入/徘徊、疑似跌倒）与“辅助告警”处置流程。
        </div>
        <AlarmTable
          alarms={alarms}
          onUpdate={(id, patch) => {
            setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))
          }}
        />
      </Card>
    </div>
  )
}

