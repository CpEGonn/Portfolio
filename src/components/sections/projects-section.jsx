import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronRight, FolderOpen } from "lucide-react";
import ProjectDetailsModal from "../ui/project-details-modal";
import { projects } from "../../data/projects";
import { cn } from "../../lib/utils";

function ProjectsSection() {
  const railRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    gesture: null,
    pointerId: null,
    projectId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
  });
  const scrollStateRef = useRef({ left: false, right: true });
  const scrollFrameRef = useRef(null);
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isRailDragging, setIsRailDragging] = useState(false);
  const activeProject =
    projects.find(({ id }) => id === activeProjectId) ?? projects[0];

  useEffect(() => {
    const railElement = railRef.current;

    if (!railElement) return undefined;

    const syncScrollState = () => {
      const { scrollLeft, clientWidth, scrollWidth } = railElement;
      const nextLeft = scrollLeft > 4;
      const nextRight = scrollLeft + clientWidth < scrollWidth - 4;

      if (scrollStateRef.current.left !== nextLeft) {
        scrollStateRef.current.left = nextLeft;
        setCanScrollLeft(nextLeft);
      }

      if (scrollStateRef.current.right !== nextRight) {
        scrollStateRef.current.right = nextRight;
        setCanScrollRight(nextRight);
      }
    };

    const scheduleScrollStateSync = () => {
      if (scrollFrameRef.current !== null) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        syncScrollState();
      });
    };

    syncScrollState();
    railElement.addEventListener("scroll", scheduleScrollStateSync, {
      passive: true,
    });
    window.addEventListener("resize", scheduleScrollStateSync);

    return () => {
      railElement.removeEventListener("scroll", scheduleScrollStateSync);
      window.removeEventListener("resize", scheduleScrollStateSync);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  function openProject(projectId) {
    // eslint-disable-next-line react-hooks/immutability -- intentional DOM dataset write in an event handler
    document.documentElement.dataset.projectModalOpen = "true";
    window.dispatchEvent(
      new CustomEvent("project-modal-state", { detail: { isOpen: true } }),
    );
    setActiveProjectId(projectId);
    setIsDetailOpen(true);
  }

  function closeProject() {
    delete document.documentElement.dataset.projectModalOpen;
    window.dispatchEvent(
      new CustomEvent("project-modal-state", { detail: { isOpen: false } }),
    );
    setIsDetailOpen(false);
  }

  function scrollProjects(direction) {
    const railElement = railRef.current;
    if (!railElement) return;

    railElement.scrollBy({
      left: direction * Math.min(railElement.clientWidth * 0.85, 560),
      behavior: "smooth",
    });
  }

  function handleRailPointerDown(event) {
    const railElement = railRef.current;
    if (!railElement) return;

    dragStateRef.current = {
      isDragging: true,
      hasMoved: false,
      gesture: null,
      pointerId: event.pointerId,
      projectId:
        event.target instanceof Element
          ? event.target.closest("[data-project-id]")?.dataset.projectId ?? null
          : null,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: railElement.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsRailDragging(false);
  }

  function handleRailPointerMove(event) {
    const railElement = railRef.current;
    if (
      !railElement ||
      !dragStateRef.current.isDragging ||
      dragStateRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const horizontalDistance = event.clientX - dragStateRef.current.startX;
    const verticalDistance = event.clientY - dragStateRef.current.startY;

    if (
      !dragStateRef.current.hasMoved &&
      Math.hypot(horizontalDistance, verticalDistance) > 8
    ) {
      dragStateRef.current.hasMoved = true;
      dragStateRef.current.gesture =
        Math.abs(horizontalDistance) >= Math.abs(verticalDistance)
          ? "horizontal"
          : "vertical";
      setIsRailDragging(dragStateRef.current.gesture === "horizontal");
    }

    if (dragStateRef.current.gesture === "horizontal") {
      railElement.scrollLeft =
        dragStateRef.current.startScrollLeft - horizontalDistance;
    }
  }

  function handleRailPointerUp(event) {
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const { hasMoved, projectId } = dragStateRef.current;
    dragStateRef.current.isDragging = false;
    dragStateRef.current.pointerId = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => setIsRailDragging(false), 0);

    if (!hasMoved && projectId) {
      openProject(projectId);
    }
  }

  function handleRailPointerCancel(event) {
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    dragStateRef.current.isDragging = false;
    dragStateRef.current.hasMoved = true;
    dragStateRef.current.pointerId = null;
    setIsRailDragging(false);
  }

  return (
    <>
      <section
        id="projects"
        className="border-border scroll-mt-28 border-t py-16 sm:py-20"
      >
        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-surface border-border rounded-4xl border p-5 sm:p-8"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
              <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs sm:gap-3 sm:px-4 sm:text-sm">
                <FolderOpen size={16} className="text-primary" />
                <span>Projects</span>
              </div>
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <h2 className="text-primary max-w-4xl text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Selected projects across software and hardware
                </h2>
                <p className="text-muted max-w-3xl text-sm leading-6 sm:text-base sm:leading-8">
                  A focused selection of academic and practical work that reflects my experience in frontend development, backend integration, embedded systems, and hardware implementation
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative -mx-6 overflow-hidden sm:mx-0"
          >
            {canScrollLeft && <div className="pointer-events-none absolute top-0 bottom-2 left-0 z-10 hidden w-32 bg-linear-to-r from-bg via-bg/72 via-55% to-transparent sm:block" />}
            {canScrollRight && <div className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 hidden w-32 bg-linear-to-l from-bg via-bg/72 via-55% to-transparent sm:block" />}
            {canScrollLeft && (
              <ScrollButton direction="left" onClick={() => scrollProjects(-1)} />
            )}
            {canScrollRight && (
              <ScrollButton direction="right" onClick={() => scrollProjects(1)} />
            )}

            <div
              ref={railRef}
              className={cn(
                "project-scrollbar touch-pan-y overflow-x-auto px-6 pb-2 select-none sm:px-1",
                isRailDragging ? "cursor-grabbing" : "cursor-grab",
              )}
              onPointerDown={handleRailPointerDown}
              onPointerMove={handleRailPointerMove}
              onPointerUp={handleRailPointerUp}
              onPointerCancel={handleRailPointerCancel}
            >
              <div className="flex min-w-max gap-3 pr-6 sm:gap-4 sm:pl-1 sm:pr-10">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={isDetailOpen && project.id === activeProjectId}
                    onOpen={() => openProject(project.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectDetailsModal
        isOpen={isDetailOpen}
        onClose={closeProject}
        project={activeProject}
      />
    </>
  );
}

function ScrollButton({ direction, onClick }) {
  const isLeft = direction === "left";
  const Icon = isLeft ? ArrowLeft : ArrowRight;

  return (
    <div className={cn("absolute top-1/2 z-20 hidden -translate-y-1/2 sm:block", isLeft ? "left-0" : "right-0")}>
      <button
        type="button"
        onClick={onClick}
        className="bg-card/96 border-border text-primary inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border shadow-soft backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-150 hover:bg-surface"
        aria-label={`Scroll projects ${direction}`}
      >
        <Icon size={18} />
      </button>
    </div>
  );
}

function ProjectCard({ project, isActive, onOpen }) {
  const ProjectIcon = project.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group bg-card border-border flex w-72 shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl border text-left transition-[background-color,border-color,color] duration-150 sm:w-96 md:w-[34rem]",
        isActive && "bg-primary text-bg border-primary",
      )}
      data-project-id={project.id}
      aria-pressed={isActive}
      onClick={(event) => {
        if (event.detail === 0) onOpen();
      }}
    >
      <div className="bg-surface aspect-video overflow-hidden border-b border-border">
        <img
          src={project.thumbnail}
          alt={`${project.title} project thumbnail`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn("bg-surface border-border text-primary inline-flex rounded-xl border p-2.5 sm:rounded-2xl sm:p-3", isActive && "bg-bg border-transparent text-primary")}>
              <ProjectIcon size={16} className="sm:hidden" />
              <ProjectIcon size={18} className="hidden sm:block" />
            </div>
            <p className={cn("text-primary text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]", isActive && "text-bg")}>
              {project.label}
            </p>
          </div>
          <ChevronRight size={16} className={isActive ? "text-bg" : "text-secondary"} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className={cn("text-primary text-lg font-semibold tracking-tight sm:text-xl", isActive && "text-bg")}>
            {project.title}
          </h3>
          <p className={cn("text-muted line-clamp-2 text-xs leading-5 sm:text-sm sm:leading-6", isActive && "text-bg/80")}>
            {project.summary}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className={cn("text-muted text-xs leading-5 sm:text-sm sm:leading-7", isActive && "text-bg/80")}>
            {project.period}
          </p>
          <span className={cn("text-primary text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]", isActive ? "text-bg" : "text-secondary")}>
            View
          </span>
        </div>
      </div>
    </button>
  );
}

export default ProjectsSection;
