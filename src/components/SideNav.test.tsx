import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SideNav } from './SideNav'

describe('SideNav', () => {
  it('renders nav entries', () => {
    render(
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>,
    )
    expect(screen.getByText('态势总览')).toBeInTheDocument()
    expect(screen.getByText('告警中心')).toBeInTheDocument()
    expect(screen.getByText('设备与点位')).toBeInTheDocument()
  })
})

