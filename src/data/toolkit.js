import {
  BrainCircuit,
  Cable,
  Code2,
  Cpu,
  Handshake,
  MessageSquareText,
  MonitorCog,
  PanelsTopLeft,
  Sparkles,
  SquareTerminal,
  UsersRound,
} from "lucide-react";
import {
  SiArduino,
  SiEasyeda,
  SiFastapi,
  SiFigma,
  SiFlutter,
  SiGithub,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiNextdotjs,
  SiOpenai,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import openCodeLogo from "../assets/images/branding/opencode-logo-dark-square.png";

export const toolkitCategories = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interface design and web experiences.",
    icon: PanelsTopLeft,
    items: [
      { name: "HTML and CSS", icon: SiHtml5 },
      { name: "React JS", icon: SiReact, featured: true },
      { name: "Next.js", icon: SiNextdotjs, featured: true},
      { name: "Tailwind CSS", icon: SiTailwindcss, featured: true },
      { name: "JavaScript", icon: SiJavascript, featured: true },
      { name: "FlutterFlow", icon: SiFlutter, featured: true },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, services, and data foundations.",
    icon: Code2,
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython, featured: true },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Supabase", icon: SiSupabase, featured: true },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    id: "ai",
    title: "AI Tools",
    description: "AI-assisted building and experimentation.",
    icon: Sparkles,
    items: [
      { name: "ChatGPT", icon: SiOpenai },
      { name: "Codex", icon: SquareTerminal },
      { name: "OpenCode", image: openCodeLogo },
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    description: "Tools for building, testing, and shipping.",
    icon: MonitorCog,
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Embedded Systems",
    description: "Systems, circuits, and hands-on prototyping.",
    icon: Cpu,
    items: [
      { name: "Digital Logic Circuits", icon: Cable },
      { name: "Microcontrollers", icon: Cpu },
      { name: "Arduino", icon: SiArduino },
      { name: "ESP32", icon: Cpu },
      { name: "Schematic and PCB Layout", icon: SiEasyeda },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    description: "Strengths that support thoughtful collaboration.",
    icon: Handshake,
    items: [
      { name: "Able to work individually and as part of a team", icon: UsersRound },
      { name: "Excellent organizational and time management skills", icon: MonitorCog },
      { name: "Strong problem-solving, critical thinking, and adaptability", icon: BrainCircuit },
      { name: "Effective communication skills in Filipino and English", icon: MessageSquareText },
    ],
  },
];

export const featuredToolkitItems = toolkitCategories
  .flatMap(({ items }) => items)
  .filter(({ featured }) => featured);
