import { useState } from "react";
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap,
  MapPinned,
  ScanSearch,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import mapBlack from "../../assets/images/branding/map-black.webp";
import mapWhite from "../../assets/images/branding/map-white.webp";
import bsuLogo from "../../assets/images/bsu-logo.webp";
import { featuredToolkitItems, toolkitCategories } from "../../data/toolkit";
import ToolkitCategory from "./toolkit-category";

function SetupOverview() {
  const [isAllSkillsVisible, setIsAllSkillsVisible] = useState(false);

  return (
    <section
      id="about"
      className="border-border scroll-mt-28 border-t py-16 sm:py-20"
    >
      <div className="grid gap-8 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch"
        >
          <div className="flex flex-col gap-5 rounded-4xl sm:px-2 sm:pt-2">
            <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm">
              <UserRound size={16} className="text-primary" />
              <span>About Me</span>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-primary max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Computer engineering with both software and hardware
                foundations
              </h2>
              <p className="text-muted max-w-2xl text-base leading-8">
                I build practical software interfaces while growing a solid
                foundation in hardware, systems, and engineering
                problem-solving
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-card border-border rounded-3xl border px-5 py-4">
                <div className="flex items-start gap-4">
                  <div className="bg-surface border-border text-primary inline-flex shrink-0 rounded-2xl border p-3">
                    <Code2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
                      Software
                    </p>
                    <p className="text-muted mt-2 text-sm leading-7">
                      Responsive UI, frontend structure, and product-minded
                      implementation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border-border rounded-3xl border px-5 py-4">
                <div className="flex items-start gap-4">
                  <div className="bg-surface border-border text-primary inline-flex shrink-0 rounded-2xl border p-3">
                    <Cpu size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
                      Hardware
                    </p>
                    <p className="text-muted mt-2 text-sm leading-7">
                      Basic knowledge in logic, microcontrollers, PCB-related
                      work, and systems thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border-border flex h-full flex-col rounded-4xl border p-5 sm:p-6">
            <div className="grid flex-1 content-center gap-5 sm:grid-cols-[0.72fr_1fr] sm:items-center">
              <div className="flex items-center justify-center">
                <img
                  src={mapBlack}
                  alt="Map of the Philippines"
                  className="location-map-light h-auto w-full max-w-44"
                />
                <img
                  src={mapWhite}
                  alt="Map of the Philippines"
                  className="location-map-dark h-auto w-full max-w-44"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2.5">
                  <div className="bg-card border-border text-primary rounded-2xl border p-3">
                    <MapPinned size={18} />
                  </div>
                  <p className="text-primary text-base font-semibold uppercase tracking-[0.16em]">
                    Location
                  </p>
                </div>

                <p className="text-primary mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl xl:text-6xl">
                  Philippines
                </p>
                <p className="text-muted mt-4 max-w-md text-base leading-7">
                  Open to remote collaboration and entry-level roles where
                  technical adaptability, continuous learning, and steady
                  professional growth are valued
                </p>
              </div>
            </div>

            <div className="border-border mt-5 flex flex-col justify-center gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex min-w-0 items-center gap-4">
                <div className="bg-card border-border flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border p-2.5">
                  <img
                    src={bsuLogo}
                    alt="Batangas State University logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={15} className="text-primary shrink-0" />
                    <p className="text-primary text-xs font-semibold uppercase tracking-[0.14em]">
                      Education
                    </p>
                  </div>
                  <p className="text-primary mt-1 text-sm leading-snug font-medium">
                    Batangas State University - The National Engineering
                    University
                  </p>
                  <p className="text-secondary text-sm">
                    BS Computer Engineering
                    <span className="text-muted"> · 2022 - 2026</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
          className="bg-card border-border rounded-4xl border px-6 py-6 sm:px-8 sm:py-7"
        >
          <div className="grid gap-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="bg-surface border-border text-primary inline-flex rounded-2xl border p-3">
                <ScanSearch size={18} />
              </div>
              <div>
                <h3 className="text-primary text-3xl font-semibold tracking-tight sm:text-4xl">
                  Technologies I work with
                </h3>
                <p className="text-muted mt-4 max-w-2xl text-base leading-7">
                  A concise overview of the tools, platforms, and technical
                  areas I use across interface design, frontend builds, and
                  practical development work
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {featuredToolkitItems.map(({ name, icon: Icon }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="bg-surface border-border group rounded-2xl border px-4 py-3 transition-[background-color,border-color,color,transform] duration-150 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-card border-border text-primary rounded-xl border p-2.5">
                      <Icon size={20} />
                    </div>
                    <p className="text-primary text-sm font-medium">{name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() =>
                  setIsAllSkillsVisible((currentValue) => !currentValue)
                }
                className="border-border text-primary hover:bg-surface inline-flex cursor-pointer items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 hover:-translate-y-0.5"
                aria-expanded={isAllSkillsVisible}
              >
                <span>{isAllSkillsVisible ? "Hide details" : "View all"}</span>
                {isAllSkillsVisible ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>
          </div>

          {isAllSkillsVisible && (
            <div className="border-border mt-6 grid gap-5 border-t pt-6">
              <div className="grid gap-4 sm:gap-5">
                {toolkitCategories.map((category) => (
                  <ToolkitCategory key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default SetupOverview;
