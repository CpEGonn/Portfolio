import { Cable, Cpu, Globe, GraduationCap, Microchip } from "lucide-react";
import hivemateLanding from "../assets/HivemateAssets/Landing Page.png";
import hivemateDashboard from "../assets/HivemateAssets/Main Dashboard Page.png";
import hivemateDashboardModal1 from "../assets/HivemateAssets/Main Dashboard Page - popup1.png";
import hivemateDashboardModal2 from "../assets/HivemateAssets/Main Dashboard Page - popup2.png";
import hivemateAnnouncement from "../assets/HivemateAssets/Make Aannouncement Page.png";
import hivemateBills from "../assets/HivemateAssets/Manage Bills Page.png";
import hivemateBillsModal1 from "../assets/HivemateAssets/Manage Bills Page - popup1.png";
import hivemateBillsModal2 from "../assets/HivemateAssets/Manage Bills Page - popup2.png";
import hivemateSchedule from "../assets/HivemateAssets/Manage Schedule Page.png";
import hivemateRegister from "../assets/HivemateAssets/RegisterPage.png";
import dormThumbnail from "../assets/Project Tumbnail/Dorm Management-Thumbnail.png";
import hardwarePlaceholder from "../assets/Project Tumbnail/hardware-placeholder.png";
import jpoThumbnail from "../assets/Project Tumbnail/JPO-Thumbnail.png";
import nextChikaThumbnail from "../assets/Project Tumbnail/NextChika-Thumbnail.png";
import shortcutThumbnail from "../assets/Project Tumbnail/ShortCut ATlas-Thumbnail.png";

export const projects = [
  {
    id: "thesis",
    title: "Job Postings and Credential Screening Web Application",
    label: "Web Application",
    period: "2026 / Thesis project",
    icon: GraduationCap,
    thumbnail: jpoThumbnail,
    summary:
      "A completed alumni-focused job posting and credential screening web application that uses a trained E5-base-v2 model for credential-to-job matching and relevance analysis.",
    highlights: [
      "Developed an alumni-focused platform that matches user credentials with job requirements through relevance-based model scoring.",
      "Built the frontend with React.js and Tailwind CSS, and developed the backend with FastAPI and Supabase, including API integration, database operations, and core system workflows.",
      "Used development tools throughout the build process for implementation support, debugging, and code refinement.",
    ],
    stack: ["React.js", "Tailwind CSS", "FastAPI", "Supabase", "E5-base-v2"],
    liveUrl: "https://thesis-clone.markeringonzalvo.site",
    notice:
      "This website is a landing-page clone of the actual project. The original project is not currently available to the public due to institutional considerations.",
  },
  {
    id: "nextchika",
    title: "NextChika: Real-Time Blog Platform",
    label: "Web Application",
    period: "2026 / Personal project",
    icon: Globe,
    thumbnail: nextChikaThumbnail,
    summary:
      "A full-stack blogging platform where users can create posts, upload images, search articles, comment on posts, and see live viewers in real time.",
    highlights: [
      "Built a realtime blog platform with authentication, post creation, image uploads, comments, and search.",
      "Integrated Convex for the database, backend functions, storage, and live presence updates.",
      "Created a responsive interface with dark mode, mobile navigation, and form validation.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Convex", "Better Auth"],
    liveUrl: "https://next-chika.markeringonzalvo.site",
  },
  {
    id: "shortcut-atlas",
    title: "ShortCut Atlas: Full-Stack URL Shortener",
    label: "Web Application",
    period: "2026 / Personal project",
    icon: Globe,
    thumbnail: shortcutThumbnail,
    summary:
      "A deployed URL-shortening web app for creating, copying, tracking, and redirecting compact links with persistent cloud storage.",
    highlights: [
      "Built the responsive full-stack URL shortener with persistent link records, visit tracking, redirects, and production deployment.",
      "Integrated and tested frontend-to-backend synchronization with Neon Postgres for reliable create and retrieval flows.",
      "Used agentic coding workflows for implementation, debugging, production log analysis, deployment fixes, and automated verification.",
    ],
    stack: [
      "React + Vite",
      "Node.js + Express",
      "Neon Postgres",
      "Vercel",
      "Agentic coding workflows",
    ],
    liveUrl: "https://short-cut-atlas.vercel.app",
  },
  {
    id: "dorm",
    title: "Dorm Management Website",
    label: "Web Application",
    period: "2025 / Academic Project",
    icon: Globe,
    thumbnail: dormThumbnail,
    summary:
      "A dorm management website designed around usability, clear workflow structure, and practical full-stack implementation.",
    highlights: [
      "Designed the UI/UX in Figma, focusing on usability and simple workflow design.",
      "Implemented the frontend with React.js and Tailwind CSS, using AI tools to support code generation and learning modern frontend practices.",
      "Developed the backend API using Django REST Framework and MySQL with AI-assisted development support.",
    ],
    stack: [
      "Figma",
      "React.js",
      "Tailwind CSS",
      "Django REST Framework",
      "MySQL",
    ],
    liveUrl: "https://demo-hivemate.markeringonzalvo.site",
    notice:
      "The backend is not configured and may be broken. This site is available for frontend demonstration purposes only.",
    gallery: [
      {
        src: hivemateLanding,
        alt: "Hivemate landing page",
        label: "Landing Page",
      },
      {
        src: hivemateRegister,
        alt: "Hivemate registration page",
        label: "Register Page",
      },
      {
        src: hivemateDashboard,
        alt: "Hivemate main dashboard",
        label: "Main Dashboard Page",
      },
      {
        src: hivemateDashboardModal1,
        alt: "Hivemate dashboard popup",
        label: "Dashboard Modal",
      },
      {
        src: hivemateDashboardModal2,
        alt: "Hivemate dashboard popup",
        label: "Dashboard Modal",
      },
      {
        src: hivemateBills,
        alt: "Hivemate manage bills page",
        label: "Manage Bills Page",
      },
      {
        src: hivemateBillsModal1,
        alt: "Hivemate bills popup",
        label: "Bills Modal",
      },
      {
        src: hivemateBillsModal2,
        alt: "Hivemate bills popup",
        label: "Bills Modal",
      },
      {
        src: hivemateSchedule,
        alt: "Hivemate manage schedule page",
        label: "Manage Schedule Page",
      },
      {
        src: hivemateAnnouncement,
        alt: "Hivemate make announcement page",
        label: "Announcement Page",
      },
    ],
  },
  {
    id: "stored-program",
    title:
      "Stored Program Machine for Car Kit Control Using Basic Digital Components",
    label: "Hardware Project",
    period: "2025 / Academic Project",
    icon: Cpu,
    thumbnail: hardwarePlaceholder,
    summary:
      "A stored-program-based control circuit for a four-wheel car kit built using basic digital logic components.",
    highlights: [
      "Designed and implemented a stored-program-based control circuit for a four-wheel car kit using basic digital logic components.",
      "Performed hardware assembly, wiring, and functional testing of the circuit design.",
    ],
    stack: ["Digital Logic", "Control Circuit Design", "Hardware Testing"],
  },
  {
    id: "firefighting-car",
    title: "ESP32-Based Autonomous Firefighting Car",
    label: "Embedded Systems",
    period: "2025 / Academic Project",
    icon: Microchip,
    thumbnail: hardwarePlaceholder,
    summary:
      "A four-wheel car kit designed to automatically extinguish small fires and avoid obstacles using ESP32 and sensor-driven control.",
    highlights: [
      "Designed the circuit diagram of a four-wheeled car kit that automatically extinguishes small fires and avoids obstacles using ESP32 and various sensors.",
      "Programmed the ESP32 to control motors, read sensor data, and trigger obstacle avoidance and fire-extinguishing behavior.",
    ],
    stack: ["ESP32", "Sensors", "Motor Control", "Embedded Programming"],
  },
  {
    id: "lan-checker",
    title: "DIY Ethernet LAN Cable Checker",
    label: "Electronics Project",
    period: "2025 / Academic Project",
    icon: Cable,
    thumbnail: hardwarePlaceholder,
    summary:
      "A functional LAN cable checker designed from schematic stage through PCB layout, fabrication, and final assembly.",
    highlights: [
      "Designed the schematic diagram and PCB layout using EasyEDA.",
      "Performed hardware assembly and the manual PCB etching process.",
    ],
    stack: ["EasyEDA", "PCB Layout", "PCB Etching", "Hardware Assembly"],
  },
];
