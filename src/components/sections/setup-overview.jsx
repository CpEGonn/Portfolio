import { useState } from "react";
import {
  Badge,
  BadgeCheck,
  Braces,
  Code2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers3,
  MapPinned,
  MessageSquareText,
  PencilRuler,
  ScanSearch,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import {
  SiFigma,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import mapBlack from "../../assets/images/branding/map-black.webp";
import mapWhite from "../../assets/images/branding/map-white.webp";

const familiarTools = [
  { label: "Python", icon: SiPython },
  { label: "JavaScript", icon: SiJavascript },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "FlutterFlow", icon: SiFlutter },
  { label: "Supabase", icon: SiSupabase },
  { label: "React", icon: SiReact },
  { label: "Figma", icon: SiFigma },
];

const skillCollections = [
  {
    id: "frontend",
    title: "Frontend and Interface",
    description:
      "The tools I use most when shaping layouts, components, and polished screens.",
    icon: Layers3,
    items: ["HTML and CSS", "React JS", "Tailwind CSS", "JavaScript", "Figma"],
  },
  {
    id: "workflow",
    title: "Tools and Workflow",
    description:
      "Platforms and software that support faster building, iteration, and delivery.",
    icon: PencilRuler,
    items: [
      "FlutterFlow",
      "Supabase",
      "VS Code",
      "MySQL",
      "AutoCAD",
      "SketchUp",
    ],
  },
  {
    id: "engineering",
    title: "Engineering Foundation",
    description:
      "The technical base that supports my interest in practical systems and hardware.",
    icon: Cpu,
    items: [
      "Python",
      "Digital Logic Circuits",
      "Microcontrollers",
      "Arduino",
      "ESP32",
      "Schematic and PCB Layout",
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    description:
      "The personal strengths I bring into collaboration, communication, and day-to-day execution.",
    icon: MessageSquareText,
    items: [
      "Able to work individually and as part of a team",
      "Excellent organizational and time management skills",
      "Strong problem-solving, critical thinking, and adaptability",
      "Effective communication skills in Filipino and English",
    ],
  },
];

const skillIcons = {
  "HTML and CSS": SiHtml5,
  "React JS": SiReact,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  Figma: SiFigma,
  FlutterFlow: SiFlutter,
  Supabase: SiSupabase,
  "VS Code": VscVscode,
  MySQL: SiMysql,
  AutoCAD: PencilRuler,
  SketchUp: PencilRuler,
  Python: SiPython,
  "Digital Logic Circuits": Braces,
  Microcontrollers: Cpu,
  Arduino: Badge,
  ESP32: Cpu,
  "Schematic and PCB Layout": PencilRuler,
  "Able to work individually and as part of a team": BadgeCheck,
  "Excellent organizational and time management skills": BadgeCheck,
  "Strong problem-solving, critical thinking, and adaptability": BadgeCheck,
  "Effective communication skills in Filipino and English": BadgeCheck,
};

function SetupOverview() {
  const [isAllSkillsVisible, setIsAllSkillsVisible] = useState(false);
  const [activeSkillCollection, setActiveSkillCollection] = useState(
    skillCollections[0].id,
  );
  const selectedSkillCollection =
    skillCollections.find(({ id }) => id === activeSkillCollection) ??
    skillCollections[0];
  const SelectedIcon = selectedSkillCollection.icon;

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
          <div className="flex flex-col gap-5 rounded-4xl sm:p-2">
            <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm">
              <UserRound size={16} className="text-primary" />
              <span>About Me</span>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-primary max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Computer engineering with both software and hardware
                foundations.
              </h2>
              <p className="text-muted max-w-2xl text-base leading-8">
                I build practical software interfaces while growing a solid
                foundation in hardware, systems, and engineering
                problem-solving.
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

          <div className="bg-surface border-border rounded-4xl border p-6 sm:p-8">
            <div className="grid gap-8 lg:min-h-full lg:grid-cols-[0.72fr_1fr] lg:items-center">
              <div className="flex items-center justify-center lg:h-full lg:justify-center">
                <img
                  src={mapBlack}
                  alt="Map of the Philippines"
                  className="location-map-light h-auto w-full max-w-44 lg:max-w-48"
                />
                <img
                  src={mapWhite}
                  alt="Map of the Philippines"
                  className="location-map-dark h-auto w-full max-w-44 lg:max-w-48"
                />
              </div>

              <div className="flex flex-col justify-center lg:min-h-68 lg:pr-3">
                <div className="flex items-center gap-3">
                  <div className="bg-card border-border text-primary rounded-2xl border p-3">
                    <MapPinned size={18} />
                  </div>
                  <div>
                    <p className="text-primary text-base font-semibold uppercase tracking-[0.16em]">
                      Location
                    </p>
                  </div>
                </div>

                <p className="text-primary mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                  Philippines
                </p>
                <p className="text-muted mt-6 max-w-sm text-base leading-8 sm:text-lg">
                  Open to remote collaboration and entry-level roles where
                  technical adaptability, continuous learning, and steady
                  professional growth are valued.
                </p>
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
                  Technologies I work with.
                </h3>
                <p className="text-muted mt-4 max-w-2xl text-base leading-7">
                  A concise overview of the tools, platforms, and technical
                  areas I use across interface design, frontend builds, and
                  practical development work.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {familiarTools.map(({ label, icon: Icon }, index) => (
                <motion.div
                  key={label}
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
                    <p className="text-primary text-sm font-medium">{label}</p>
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
              <div className="flex flex-wrap justify-center gap-3">
                {skillCollections.map(({ id, title }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveSkillCollection(id)}
                    className={
                      activeSkillCollection === id
                        ? "bg-primary text-bg inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150"
                        : "bg-surface border-border text-primary hover:bg-card inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150"
                    }
                  >
                    {title}
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedSkillCollection.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-surface border-border rounded-4xl border p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="bg-card border-border text-primary inline-flex rounded-2xl border p-3">
                      <SelectedIcon size={18} />
                    </div>
                    <div>
                      <p className="text-primary text-xl font-semibold tracking-[-0.04em]">
                        {selectedSkillCollection.title}
                      </p>
                      <p className="text-muted mt-2 max-w-3xl text-sm leading-6">
                        {selectedSkillCollection.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      selectedSkillCollection.id === "soft"
                        ? "mx-auto grid w-full max-w-4xl gap-3 sm:grid-cols-2"
                        : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
                    }
                  >
                    {selectedSkillCollection.items.map((skill) =>
                      (() => {
                        const SkillIcon = skillIcons[skill] ?? BadgeCheck;

                        return (
                          <div
                            key={skill}
                            className={
                              selectedSkillCollection.id === "soft"
                                ? "border-border bg-card text-text flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-6"
                                : "border-border bg-card text-text inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm leading-6"
                            }
                          >
                            <SkillIcon
                              size={18}
                              className="text-primary shrink-0"
                            />
                            <span>{skill}</span>
                          </div>
                        );
                      })(),
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default SetupOverview;
