import { render, screen } from '@testing-library/react'
import { DeviceList } from './DeviceList'
import type { Device } from '../utils/types'

describe('DeviceList', () => {
  it('renders devices', () => {
    const devices: Device[] = [
      {
        id: 'd1',
        name: 'DVS #1',
        zone: '涉密核心区-A',
        kind: 'DVS',
        online: true,
        lastSeenAt: new Date().toISOString(),
      },
    ]

    render(<DeviceList devices={devices} />)
    expect(screen.getByText('DVS #1')).toBeInTheDocument()
    expect(screen.getByText('涉密核心区-A')).toBeInTheDocument()
    expect(screen.getByText('在线')).toBeInTheDocument()
  })
})

