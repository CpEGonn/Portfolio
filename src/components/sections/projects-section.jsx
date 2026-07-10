import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Cable,
  ChevronRight,
  Cpu,
  Globe,
  FolderOpen,
  GraduationCap,
  Microchip,
} from 'lucide-react'
import ProjectDetailsModal from '../ui/project-details-modal'
import { cn } from '../../lib/utils'

const projects = [
  {
    id: 'thesis',
    title: 'Job Postings and Credential Screening Web Application',
    label: 'Featured Thesis Project',
    period: '2026 / Thesis project',
    icon: GraduationCap,
    summary:
      'A completed alumni-focused job posting and credential screening web application that uses a trained E5-base-v2 model for credential-to-job matching and relevance analysis.',
    highlights: [
      'Developed an alumni-focused platform that matches user credentials with job requirements through relevance-based model scoring.',
      'Built the frontend with React.js and Tailwind CSS, and developed the backend with FastAPI and Supabase, including API integration, database operations, and core system workflows.',
      'Used development tools throughout the build process for implementation support, debugging, and code refinement.',
    ],
    stack: ['React.js', 'Tailwind CSS', 'FastAPI', 'Supabase', 'E5-base-v2'],
  },
  {
    id: 'dorm',
    title: 'Dorm Management Website',
    label: 'Web Application',
    period: '2025 / Web application',
    icon: Globe,
    summary:
      'A dorm management website designed around usability, clear workflow structure, and practical full-stack implementation.',
    highlights: [
      'Designed the UI/UX in Figma, focusing on usability and simple workflow design.',
      'Implemented the frontend with React.js and Tailwind CSS, using AI tools to support code generation and learning modern frontend practices.',
      'Developed the backend API using Django REST Framework and MySQL with AI-assisted development support.',
    ],
    stack: ['Figma', 'React.js', 'Tailwind CSS', 'Django REST Framework', 'MySQL'],
  },
  {
    id: 'stored-program',
    title: 'Stored Program Machine for Car Kit Control Using Basic Digital Components',
    label: 'Hardware Project',
    period: '2025 / Digital logic project',
    icon: Cpu,
    summary:
      'A stored-program-based control circuit for a four-wheel car kit built using basic digital logic components.',
    highlights: [
      'Designed and implemented a stored-program-based control circuit for a four-wheel car kit using basic digital logic components.',
      'Performed hardware assembly, wiring, and functional testing of the circuit design.',
    ],
    stack: ['Digital Logic', 'Control Circuit Design', 'Hardware Testing'],
  },
  {
    id: 'firefighting-car',
    title: 'ESP32-Based Autonomous Firefighting Car',
    label: 'Embedded Systems',
    period: '2025 / Embedded systems project',
    icon: Microchip,
    summary:
      'A four-wheel car kit designed to automatically extinguish small fires and avoid obstacles using ESP32 and sensor-driven control.',
    highlights: [
      'Designed the circuit diagram of a four-wheeled car kit that automatically extinguishes small fires and avoids obstacles using ESP32 and various sensors.',
      'Programmed the ESP32 to control motors, read sensor data, and trigger obstacle avoidance and fire-extinguishing behavior.',
    ],
    stack: ['ESP32', 'Sensors', 'Motor Control', 'Embedded Programming'],
  },
  {
    id: 'lan-checker',
    title: 'DIY Ethernet LAN Cable Checker',
    label: 'Electronics Project',
    period: '2025 / PCB design and fabrication',
    icon: Cable,
    summary:
      'A functional LAN cable checker designed from schematic stage through PCB layout, fabrication, and final assembly.',
    highlights: [
      'Designed the schematic diagram and PCB layout using EasyEDA.',
      'Performed hardware assembly and the manual PCB etching process.',
    ],
    stack: ['EasyEDA', 'PCB Layout', 'PCB Etching', 'Hardware Assembly'],
  },
]

function ProjectsSection() {
  const railRef = useRef(null)
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  })
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isRailDragging, setIsRailDragging] = useState(false)
  const activeProject = projects.find(({ id }) => id === activeProjectId) ?? projects[0]

  useEffect(() => {
    const railElement = railRef.current

    if (!railElement) {
      return undefined
    }

    const syncScrollState = () => {
      const { scrollLeft, clientWidth, scrollWidth } = railElement
      setCanScrollLeft(scrollLeft > 4)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
    }

    syncScrollState()
    railElement.addEventListener('scroll', syncScrollState, { passive: true })
    window.addEventListener('resize', syncScrollState)

    return () => {
      railElement.removeEventListener('scroll', syncScrollState)
      window.removeEventListener('resize', syncScrollState)
    }
  }, [])

  function openProject(projectId) {
    setActiveProjectId(projectId)
    setIsDetailOpen(true)
  }

  function scrollProjects(direction) {
    const railElement = railRef.current

    if (!railElement) {
      return
    }

    railElement.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    })
  }

  function handleRailPointerDown(event) {
    const railElement = railRef.current

    if (!railElement) {
      return
    }

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: railElement.scrollLeft,
    }
    setIsRailDragging(false)
  }

  function handleRailPointerMove(event) {
    const railElement = railRef.current

    if (!railElement || !dragStateRef.current.isDragging) {
      return
    }

    const distance = event.clientX - dragStateRef.current.startX

    if (Math.abs(distance) > 6) {
      setIsRailDragging(true)
    }

    railElement.scrollLeft = dragStateRef.current.startScrollLeft - distance
  }

  function handleRailPointerUp() {
    dragStateRef.current.isDragging = false

    window.setTimeout(() => {
      setIsRailDragging(false)
    }, 0)
  }

  return (
    <>
      <section id="projects" className="border-border scroll-mt-28 border-t py-16 sm:py-20">
        <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-surface border-border rounded-4xl border p-6 sm:p-8"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm">
              <FolderOpen size={16} className="text-primary" />
              <span>Projects</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="text-primary max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Selected projects across software and hardware.
              </h2>
              <p className="text-muted max-w-3xl text-base leading-8">
                A focused selection of academic and practical work that reflects my experience in frontend development, backend integration, embedded systems, and hardware implementation.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="grid gap-4"
        >

          <div className="relative overflow-hidden">
            {canScrollLeft && (
              <div className="pointer-events-none absolute top-0 bottom-2 left-0 z-10 w-24 bg-linear-to-r from-bg via-bg/92 via-35% to-transparent" />
            )}

            {canScrollRight && (
              <div className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-24 bg-linear-to-l from-bg via-bg/92 via-35% to-transparent" />
            )}

            {canScrollLeft && (
              <div className="absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 sm:block">
                <button
                  type="button"
                  onClick={() => scrollProjects(-1)}
                  className="bg-card/96 border-border text-primary inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border shadow-soft backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-150 hover:bg-surface"
                  aria-label="Scroll projects left"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>
            )}

            {canScrollRight && (
              <div className="absolute top-1/2 right-0 z-20 hidden -translate-y-1/2 sm:block">
                <button
                  type="button"
                  onClick={() => scrollProjects(1)}
                  className="bg-card/96 border-border text-primary inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border shadow-soft backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-150 hover:bg-surface"
                  aria-label="Scroll projects right"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            <div
              ref={railRef}
              className={cn(
                'project-scrollbar overflow-x-auto px-1 pb-2 select-none',
                isRailDragging ? 'cursor-grabbing' : 'cursor-grab',
              )}
              onPointerDown={handleRailPointerDown}
              onPointerMove={handleRailPointerMove}
              onPointerUp={handleRailPointerUp}
              onPointerLeave={handleRailPointerUp}
              onPointerCancel={handleRailPointerUp}
            >
              <div className="flex min-w-max gap-3 pl-1 pr-8 sm:pr-10">
              {projects.map((project) => {
                const ProjectIcon = project.icon
                const isActive = isDetailOpen && project.id === activeProjectId

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      if (!isRailDragging) {
                        openProject(project.id)
                      }
                    }}
                    className={cn(
                      'bg-card border-border flex w-[18rem] shrink-0 cursor-pointer flex-col gap-4 rounded-3xl border px-5 py-5 text-left transition-colors duration-75 ease-linear',
                      isActive && 'bg-primary text-bg border-primary',
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={cn(
                          'bg-surface border-border text-primary inline-flex rounded-2xl border p-3 transition-colors duration-75 ease-linear',
                          isActive && 'bg-bg border-transparent text-primary',
                        )}
                      >
                        <ProjectIcon size={18} />
                      </div>
                      <ChevronRight
                        size={18}
                        className={cn(isActive ? 'text-bg' : 'text-secondary')}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p
                        className={cn(
                          'text-primary text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-75 ease-linear',
                          isActive && 'text-bg',
                        )}
                      >
                        {project.label}
                      </p>
                      <h3
                        className={cn(
                          'text-primary text-xl font-semibold tracking-tight transition-colors duration-75 ease-linear',
                          isActive && 'text-bg',
                        )}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <p
                        className={cn(
                          'text-muted text-sm leading-7 transition-colors duration-75 ease-linear',
                          isActive && 'text-bg/80',
                        )}
                      >
                        {project.period}
                      </p>
                      <span
                        className={cn(
                          'text-primary text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-75 ease-linear',
                          isActive ? 'text-bg' : 'text-secondary',
                        )}
                      >
                        View
                      </span>
                    </div>
                  </button>
                )
              })}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      <ProjectDetailsModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={activeProject}
      />
    </>
  )
}

export default ProjectsSection
