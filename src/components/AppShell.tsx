import { useEffect, useState, type PropsWithChildren } from 'react'
import { SideNav } from './SideNav'
import { TopBar } from './TopBar'
import { ThemeContext, type ThemeMode } from '../utils/theme'

export function AppShell(props: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      }}
    >
      <div className="grid h-full grid-cols-[280px_1fr]">
        <SideNav />
        <div className="flex min-w-0 flex-col">
          <TopBar />
          <main className="min-w-0 flex-1 min-h-0 overflow-hidden p-6">
            {props.children}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}
