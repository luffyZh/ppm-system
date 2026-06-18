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
        people={[
          { id: 'p-01', x: 0, z: 0, state: 'focus' },
          { id: 'p-02', x: 1, z: 1, state: 'tracking' },
        ]}
      />,
    )
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
    expect(screen.getByText('当前房间人数')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
