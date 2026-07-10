import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Circle, Mail } from "lucide-react";
import heroImage from "../../assets/images/branding/hero.webp";

const roles = [
  "Computer Engineer",
  "Web Development Learner",
  "Embedded Systems Enthusiast",
];

function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const activeRole = roles[activeRoleIndex];

  return (
    <section id="home" className="scroll-mt-28 pt-8 pb-14 sm:pt-10 sm:pb-18">
      <div className="grid gap-10 xl:grid-cols-[1.2fr_0.88fr] xl:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm sm:text-base">
            <Circle size={10} className="fill-current stroke-none" />
            <span>Hello, I&apos;m</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="text-primary max-w-4xl text-5xl font-semibold tracking-[-0.07em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              Mark Erin Gonzalvo
            </h1>

            <div className="min-h-14 overflow-hidden sm:min-h-16">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeRole}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-secondary text-3xl font-medium tracking-[-0.04em] sm:text-5xl"
                >
                  {activeRole}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="bg-text h-1 w-14 rounded-full" aria-hidden="true" />
          </div>

          <p className="text-text max-w-2xl text-base leading-8 sm:text-lg">
            I build web-based applications and explore software-hardware
            integration through practical, hands-on projects.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-bg inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-medium transition duration-300 hover:-translate-y-0.5 hover:opacity-92"
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="border-border text-primary hover:bg-card inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-base font-medium transition duration-300 hover:-translate-y-0.5"
            >
              <ArrowRight size={18} />
              <span>View Projects</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm xl:max-w-md"
        >
          <div className="pointer-events-none absolute top-18 -left-10 hidden grid-cols-4 gap-2 opacity-25 lg:grid">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="bg-primary h-1.5 w-1.5 rounded-full"
              />
            ))}
          </div>

          <div className="bg-card border-border relative overflow-hidden rounded-4xl border p-3 sm:p-4">
            <div className="absolute inset-0 bg-linear-to-br from-white/55 via-transparent to-white/10 dark:from-white/6 dark:to-white/3" />
            <div className="absolute -left-4 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-3xl bg-white/35 backdrop-blur-sm dark:bg-white/6 lg:block" />

            <div className="relative rounded-[1.7rem] bg-linear-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
              <img
                src={heroImage}
                alt="Mark Erin portrait"
                className="h-108 w-full object-contain object-bottom sm:h-120 xl:h-128"
              />
            </div>

            <div className="absolute right-6 bottom-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-black text-sm font-medium dark:text-white">
                Available for work
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
