import type { PropsWithChildren } from 'react'
import { SideNav } from './SideNav'
import { TopBar } from './TopBar'

export function AppShell(props: PropsWithChildren) {
  return (
    <div className="grid h-full grid-cols-[280px_1fr]">
      <SideNav />
      <div className="flex min-w-0 flex-col">
        <TopBar />
        <main className="min-w-0 flex-1 overflow-auto p-6">
          {props.children}
        </main>
      </div>
    </div>
  )
}

