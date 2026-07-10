import HeroSection from '../components/sections/hero-section'
import SetupOverview from '../components/sections/setup-overview'
import ContactSection from '../components/sections/contact-section'
import ProjectsSection from '../components/sections/projects-section'

function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <SetupOverview />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

export default Home
