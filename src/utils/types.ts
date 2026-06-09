export type AlarmType = 'INTRUSION' | 'LOITERING' | 'FALL_SUSPECTED' | 'NO_MOTION'
export type AlarmStatus = 'OPEN' | 'ACKED' | 'CLOSED'

export interface Device {
  id: string
  name: string
  zone: string
  kind: 'DVS' | 'WIFI' | 'EDGE_BOX'
  online: boolean
  lastSeenAt: string // ISO
}

export interface AlarmEvent {
  id: string
  type: AlarmType
  status: AlarmStatus
  zone: string
  deviceIds: string[]
  confidence: number // 0..1
  startAt: string // ISO
  endAt?: string // ISO
  note?: string
}

