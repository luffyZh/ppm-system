import type { AlarmEvent } from '../utils/types'

export const alarms: AlarmEvent[] = [
  {
    id: 'alarm-1001',
    type: 'INTRUSION',
    status: 'OPEN',
    zone: '涉密核心区-A',
    deviceIds: ['dvs-01', 'wifi-01'],
    confidence: 0.86,
    startAt: new Date(Date.now() - 62_000).toISOString(),
  },
  {
    id: 'alarm-1002',
    type: 'LOITERING',
    status: 'ACKED',
    zone: '涉密核心区-A',
    deviceIds: ['wifi-01'],
    confidence: 0.74,
    startAt: new Date(Date.now() - 18 * 60_000).toISOString(),
    note: '已通知巡检人员到场确认',
  },
  {
    id: 'alarm-2001',
    type: 'FALL_SUSPECTED',
    status: 'OPEN',
    zone: '浴室-01',
    deviceIds: ['dvs-02', 'wifi-02'],
    confidence: 0.81,
    startAt: new Date(Date.now() - 2 * 60_000).toISOString(),
  },
]

