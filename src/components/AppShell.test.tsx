import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders sidebar and children', () => {
    render(
      <MemoryRouter>
        <AppShell>
          <div>页面内容</div>
        </AppShell>
      </MemoryRouter>,
    )
    expect(screen.getByText('鹰眼控制台')).toBeInTheDocument()
    expect(screen.getByText('页面内容')).toBeInTheDocument()
  })
})

