import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import { Room3DView } from './Room3DView'

vi.mock('@react-three/fiber', () => {
  return {
    // jsdom 不支持 WebGL；这里仅验证组件“挂载成功”，避免把 three 的 JSX 当成 DOM 渲染导致大量警告
    Canvas: () => <div data-testid="canvas" />,
  }
})

vi.mock('@react-three/drei', () => {
  return {
    OrbitControls: () => null,
    Html: () => null,
  }
})

describe('Room3DView', () => {
  it('renders canvas wrapper', () => {
    render(
      <Room3DView
        zones={[
          { zone: '涉密核心区-A', tone: 'warn', label: '涉密核心区-A' },
        ]}
      />,
    )
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })
})
