import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleX } from 'lucide-react'

function ProjectDetailsModal({ isOpen, onClose, project }) {
  const ProjectIcon = project?.icon

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.paddingRight = ''
      return undefined
    }

    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : ''

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.documentElement.style.overflow = ''
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.paddingRight = ''
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
      document.documentElement.style.scrollBehavior = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!project || !ProjectIcon) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="project-modal-backdrop fixed inset-0 z-60 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="project-modal-scrollbar bg-card border-border max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-4xl border p-6 shadow-soft sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-surface border-border text-primary inline-flex rounded-2xl border p-3">
                      <ProjectIcon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
                        {project.label}
                      </p>
                      <p className="text-muted text-sm">{project.period}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-primary max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="text-muted max-w-3xl text-base leading-8">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-surface border-border text-primary hover:bg-card inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border transition-[background-color,border-color,color] duration-150"
                  aria-label="Close project details"
                >
                  <CircleX size={18} />
                </button>
              </div>

              <div className="border-border border-t pt-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="bg-surface border-border text-primary inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold"
                        >
                          <span className="bg-primary inline-flex h-2 w-2 shrink-0 rounded-full" />
                          <span className="leading-none">{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
                      Key Contributions
                    </p>
                    <ul className="flex flex-col gap-3">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="bg-primary mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full" />
                          <p className="text-text text-sm leading-8">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectDetailsModal
