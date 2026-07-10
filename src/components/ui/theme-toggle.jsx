import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/utils'

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'text-secondary hover:text-primary inline-flex cursor-pointer items-center gap-2 px-1 py-2.5 text-sm font-medium transition',
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}

export default ThemeToggle
