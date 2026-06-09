import type { Device } from '../utils/types'

export const devices: Device[] = [
  {
    id: 'edge-001',
    name: '鹰眼边缘盒子 / Edge Box #001',
    zone: '涉密核心区-A',
    kind: 'EDGE_BOX',
    online: true,
    lastSeenAt: new Date(Date.now() - 8_000).toISOString(),
  },
  {
    id: 'dvs-01',
    name: 'DVS 事件相机 #01',
    zone: '涉密核心区-A',
    kind: 'DVS',
    online: true,
    lastSeenAt: new Date(Date.now() - 2_000).toISOString(),
  },
  {
    id: 'wifi-01',
    name: 'WiFi Sensing 节点 #01',
    zone: '涉密核心区-A',
    kind: 'WIFI',
    online: true,
    lastSeenAt: new Date(Date.now() - 5_000).toISOString(),
  },
  {
    id: 'dvs-02',
    name: 'DVS 事件相机 #02',
    zone: '浴室-01',
    kind: 'DVS',
    online: true,
    lastSeenAt: new Date(Date.now() - 3_000).toISOString(),
  },
  {
    id: 'wifi-02',
    name: 'WiFi Sensing 节点 #02',
    zone: '浴室-01',
    kind: 'WIFI',
    online: true,
    lastSeenAt: new Date(Date.now() - 4_000).toISOString(),
  },
]

