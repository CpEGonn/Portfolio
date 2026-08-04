import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { SiFigma } from 'react-icons/si'
import { cn } from '../../lib/utils'

function ProjectGallery({ gallery = [], label = 'UI/UX Design' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const swipeRef = useRef(null)

  const count = gallery.length
  const slide = gallery[index] ?? gallery[0]

  const go = useCallback(
    (direction) => {
      setIndex((current) => (current + direction + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      } else if (event.key === 'ArrowRight') {
        go(1)
      } else if (event.key === 'ArrowLeft') {
        go(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, go])

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return null
  }

  const canPrev = index > 0
  const canNext = index < count - 1

  const handlePointerDown = (event) => {
    if (event.target.closest('button')) {
      return
    }

    swipeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerEnd = (event) => {
    const swipe = swipeRef.current
    swipeRef.current = null
    if (!swipe || swipe.pointerId !== event.pointerId) {
      return
    }

    const horizontalDistance = event.clientX - swipe.startX
    const verticalDistance = event.clientY - swipe.startY

    if (Math.abs(horizontalDistance) >= 48 && Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
      go(horizontalDistance < 0 ? 1 : -1)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-surface border-border text-primary inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors duration-150 hover:bg-card"
      >
        <SiFigma size={16} aria-hidden="true" />
        <span>UI Design</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="project-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="bg-card border-border flex h-full max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border shadow-soft"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="bg-card border-border flex items-center justify-between gap-3 border-b px-5 py-4 sm:px-8 sm:py-5">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-secondary text-xs font-semibold uppercase tracking-[0.16em]">
                    {label}
                  </p>
                  <p className="text-primary truncate text-base font-semibold sm:text-lg">
                    {slide.label}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-primary hover:text-red-500 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl transition-colors duration-150 sm:h-12 sm:w-12"
                  aria-label="Close gallery"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              <div
                className="bg-surface relative flex min-h-0 flex-1 cursor-grab touch-pan-y items-center justify-center overflow-hidden p-4 active:cursor-grabbing sm:p-8"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-full w-full max-w-full select-none object-contain"
                  draggable={false}
                />

                {canPrev && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="bg-card/96 border-border text-primary absolute top-1/2 left-3 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-soft backdrop-blur-sm transition-colors duration-150 hover:bg-surface sm:h-12 sm:w-12"
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}

                {canNext && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="bg-card/96 border-border text-primary absolute top-1/2 right-3 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-soft backdrop-blur-sm transition-colors duration-150 hover:bg-surface sm:h-12 sm:w-12"
                    aria-label="Next image"
                  >
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>

              <div className="bg-card border-border flex flex-col items-center justify-center gap-3 border-t px-5 py-4">
                <span className="text-muted text-sm tabular-nums">
                  {index + 1} / {count}
                </span>
                <div className="flex items-center justify-center gap-2">
                  {gallery.map((item, itemIndex) => (
                    <button
                      key={item.src ?? itemIndex}
                      type="button"
                      onClick={() => setIndex(itemIndex)}
                      className={cn(
                        'h-2.5 cursor-pointer rounded-full border transition-[width,background-color,border-color] duration-200',
                        itemIndex === index
                          ? 'border-primary bg-primary w-6'
                          : 'border-secondary bg-transparent w-2.5 hover:bg-secondary',
                      )}
                      aria-label={`Go to image ${itemIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectGallery
