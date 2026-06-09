import { render, screen } from '@testing-library/react'
import { KpiCard } from './KpiCard'

describe('KpiCard', () => {
  it('renders label and value', () => {
    render(<KpiCard label="未处理告警" value="2" hint="示意" />)
    expect(screen.getByText('未处理告警')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('示意')).toBeInTheDocument()
  })
})

