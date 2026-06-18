import { createContext, useContext } from 'react'

export type ThemeMode = 'dark' | 'light'

export const ThemeContext = createContext<{
  theme: ThemeMode
  toggleTheme: () => void
}>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}
