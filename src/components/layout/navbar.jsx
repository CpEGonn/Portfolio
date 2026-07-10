import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoBlack from '../../assets/images/branding/logo-black.webp'
import logoWhite from '../../assets/images/branding/logo-white.webp'
import ThemeToggle from '../ui/theme-toggle'
import { cn } from '../../lib/utils'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()
  const logo = theme === 'dark' ? logoWhite : logoBlack
  const isDark = theme === 'dark'

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined
    }

    const sectionElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (sectionElements.length === 0) {
      return undefined
    }

    const syncActiveSection = () => {
      const lastSection = sectionElements.at(-1)
      const markerOffset = 180
      const scrollPosition = window.scrollY + markerOffset
      const bottomThreshold = document.documentElement.scrollHeight - window.innerHeight - 24

      if (window.scrollY >= bottomThreshold && lastSection?.id) {
        setActiveSection(lastSection.id)
        return
      }

      const currentSection =
        sectionElements.reduce((activeElement, element) => {
          return element.offsetTop <= scrollPosition ? element : activeElement
        }, sectionElements[0])

      if (currentSection?.id) {
        setActiveSection(currentSection.id)
      }
    }

    syncActiveSection()
    window.addEventListener('scroll', syncActiveSection, { passive: true })
    window.addEventListener('resize', syncActiveSection)

    return () => {
      window.removeEventListener('scroll', syncActiveSection)
      window.removeEventListener('resize', syncActiveSection)
    }
  }, [location.pathname])

  function scrollToSection(sectionId) {
    setActiveSection(sectionId)
    setIsMenuOpen(false)

    const scroll = () => {
      const target = document.getElementById(sectionId)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(scroll, 80)
      return
    }

    scroll()
  }

  return (
    <>
      <header className="bg-surface/80 border-border border-b shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <NavLink
            className="inline-flex items-center rounded-full"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Mark Erin portfolio logo"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </NavLink>

          <div className="ml-auto flex items-center gap-6">
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'text-secondary hover:text-primary relative inline-flex cursor-pointer px-1 py-2 text-sm font-medium transition',
                    'after:bg-text after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:content-[""]',
                    'hover:after:scale-x-100',
                    activeSection === link.id && 'text-primary after:scale-x-100',
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="bg-border hidden h-6 w-px lg:block" aria-hidden="true" />

            <div className="hidden sm:block">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
              className="text-primary hover:text-secondary inline-flex h-11 w-11 cursor-pointer items-center justify-center transition lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-40 bg-black/12 opacity-0 backdrop-blur-sm transition duration-200 lg:hidden',
          isMenuOpen && 'pointer-events-auto opacity-100',
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={cn(
          'bg-surface fixed inset-0 z-50 flex min-h-screen flex-col overflow-y-auto p-5 transition duration-300 lg:hidden',
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-6 opacity-0',
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <NavLink
            className="inline-flex items-center rounded-full"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Mark Erin portfolio logo"
              className="h-12 w-auto object-contain"
            />
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-primary hover:text-secondary inline-flex h-11 w-11 cursor-pointer items-center justify-center transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-border mt-5 flex flex-1 flex-col border-t pt-5">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  'relative cursor-pointer px-3 py-3 text-left text-[1.08rem] font-medium transition',
                  activeSection === link.id
                    ? 'text-primary before:bg-text before:absolute before:top-1/2 before:left-0 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:content-[""]'
                    : 'text-secondary hover:text-primary',
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="border-border mt-auto border-t pt-6 pb-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="border-border text-primary hover:bg-card inline-flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition"
            >
              <span className="inline-flex items-center gap-3">
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
                {isDark ? 'Light mode' : 'Dark mode'}
              </span>
              <span className="text-muted text-xs">
                {isDark ? 'Switch to light' : 'Switch to dark'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar
