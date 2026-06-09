import { render, screen } from '@testing-library/react'
import { AlarmBadge } from './AlarmBadge'

describe('AlarmBadge', () => {
  it('renders correct label', () => {
    render(<AlarmBadge type="FALL_SUSPECTED" />)
    expect(screen.getByText('疑似跌倒')).toBeInTheDocument()
  })
})

