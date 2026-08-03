import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { applyTheme, getPreferredTheme } from '../../lib/theme'
import Footer from './footer'
import Navbar from './navbar'
import LightRays from '../ui/light-rays'

function PageShell() {
  const [theme, setTheme] = useState(() => getPreferredTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <main className="bg-bg text-text min-h-screen">
      {theme === 'dark' && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-screen opacity-75">
          <LightRays
            raysOrigin="top-center"
            raysColor="#fffff"
            raysSpeed={0.5}
            lightSpread={0.5}
            rayLength={1}
            fadeDistance={1}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0}
          />
        </div>
      )}

      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      </div>

      <div className="relative container mx-auto flex min-h-screen flex-col gap-6 px-6 pt-24 pb-8 sm:px-8 sm:pt-26 sm:pb-8 lg:px-12 lg:pt-28 lg:pb-8">
        <div className="flex-1 pt-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default PageShell
