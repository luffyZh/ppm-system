import { Card } from '../components/Card'
import { DeviceList } from '../components/DeviceList'
import { devices } from '../mock-data/devices'

export function DevicesPage() {
  return (
    <div className="space-y-6">
      <Card
        title="设备与点位（示意）"
        right={<span className="text-zinc-500">Stage2 Demo · 本地运行</span>}
      >
        <div className="mb-4 text-sm text-zinc-400">
          说明：设备数据来自 <code className="rounded bg-white/5 px-1.5 py-0.5">mock-data</code>
          ，用于演示“可运维/可审计”的交付形态。
        </div>
        <DeviceList devices={devices} />
      </Card>
    </div>
  )
}

