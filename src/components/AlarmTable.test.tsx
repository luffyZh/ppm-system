import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { AlarmTable } from './AlarmTable'
import type { AlarmEvent } from '../utils/types'

describe('AlarmTable', () => {
  it('confirms alarm and calls onUpdate', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn()
    const alarms: AlarmEvent[] = [
      {
        id: 'a1',
        type: 'INTRUSION',
        status: 'OPEN',
        zone: '涉密核心区-A',
        deviceIds: ['dvs-01'],
        confidence: 0.8,
        startAt: new Date().toISOString(),
      },
    ]

    render(<AlarmTable alarms={alarms} onUpdate={onUpdate} />)
    expect(screen.getByText('闯入')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '确认' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '确定' }))
    expect(onUpdate).toHaveBeenCalledWith('a1', { status: 'ACKED' })
  })
})

