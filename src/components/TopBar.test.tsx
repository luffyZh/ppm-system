import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  it('shows correct title for route', () => {
    render(
      <MemoryRouter initialEntries={['/alarms']}>
        <TopBar />
      </MemoryRouter>,
    )
    expect(screen.getByText('告警中心')).toBeInTheDocument()
  })
})

