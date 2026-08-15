export const profileKnowledge = [
  {
    id: 'airin-identity',
    title: 'AIRIN identity',
    topics: ['airin', 'who are you', 'your name', 'your personality', 'bot', 'assistant'],
    content:
      'AIRIN is Mark Erin’s AI portfolio guide. AIRIN is friendly, concise, curious, and warmly professional. AIRIN can introduce itself, explain its role, and answer questions about Mark Erin’s public background, skills, education, and projects.',
  },
  {
    id: 'profile-overview',
    title: 'Mark Erin Gonzalvo overview',
    topics: ['mark erin', 'mark', 'background', 'about', 'career', 'portfolio'],
    content:
      'Mark Erin Gonzalvo is a Computer Engineering graduate from Batangas State University - The National Engineering University. He builds practical software interfaces while developing foundations in hardware, systems, and engineering problem-solving. He is based in the Philippines and is open to remote collaboration and entry-level roles.',
  },
  {
    id: 'personal-profile',
    title: 'Mark Erin’s approved personal profile',
    topics: ['birthday', 'born', 'birth date', 'age', 'favorite color', 'favourite color', 'colors', 'sports', 'basketball', 'hobby', 'hobbies', 'interests', 'gaming', 'mobile legends', 'valorant', 'anime', 'movies', 'music'],
    content:
      'Mark Erin was born on June 22, 2004. His favorite colors are black and blue. He enjoys basketball, playing online games such as Mobile Legends and Valorant, and watching anime and movies. He does not have a favorite music genre, but occasionally listens to music.',
  },
  {
    id: 'education-and-skills',
    title: 'Education and skills',
    topics: ['education', 'university', 'batangas', 'skills', 'technology', 'stack', 'tools'],
    content:
      'Mark Erin earned a BS in Computer Engineering from Batangas State University - The National Engineering University from 2022 to 2026. His portfolio includes React, Next.js, JavaScript, Tailwind CSS, Node.js, Python, FastAPI, Supabase, MySQL, Git, GitHub, Vercel, Figma, Arduino, ESP32, EasyEDA, digital logic, and PCB layout.',
  },
  {
    id: 'technology-toolkit',
    title: 'Technologies Mark Erin works with',
    topics: ['technologies', 'what technologies', 'technology', 'skills', 'technical skills', 'toolkit', 'tools', 'frontend', 'backend', 'ai tools', 'developer tools', 'hardware', 'embedded systems', 'what does mark use'],
    content:
      'Mark Erin’s technology toolkit is organized into these areas: Frontend—HTML and CSS, React JS, Next.js, Tailwind CSS, JavaScript, FlutterFlow, and Figma. Backend—Node.js, Python, FastAPI, Supabase, and MySQL. AI tools—ChatGPT, Codex, and OpenCode. Developer tools—Git, GitHub, VS Code, Postman, and Vercel. Hardware and embedded systems—digital logic circuits, microcontrollers, Arduino, ESP32, and schematic and PCB layout. His soft skills include teamwork, organization and time management, problem-solving, critical thinking, adaptability, and communication in Filipino and English.',
  },
  {
    id: 'portfolio-projects',
    title: 'Portfolio project overview',
    topics: ['projects', 'project', 'portfolio work', 'built'],
    content:
      'Mark Erin’s portfolio includes a Job Postings and Credential Screening Web Application, NextChika real-time blog platform, ShortCut Atlas URL shortener, a dorm management website, a stored-program car-kit control circuit, an ESP32 autonomous firefighting car, and a DIY Ethernet LAN cable checker.',
  },
  {
    id: 'project-job-screening',
    title: 'Job Postings and Credential Screening Web Application',
    topics: ['thesis', 'job posting', 'credential', 'screening', 'e5-base-v2'],
    content:
      'Mark Erin completed an alumni-focused thesis web application for job postings and credential screening. It matches user credentials with job requirements through relevance-based E5-base-v2 model scoring. The stack includes React, Tailwind CSS, FastAPI, Supabase, and E5-base-v2.',
  },
  {
    id: 'project-nextchika',
    title: 'NextChika',
    topics: ['nextchika', 'blog', 'convex', 'better auth', 'realtime'],
    content:
      'NextChika is Mark Erin’s personal real-time blog platform. Users can create posts, upload images, search articles, comment, and see live viewers. It uses Next.js, TypeScript, Tailwind CSS, Convex, and Better Auth.',
  },
  {
    id: 'project-shortcut-atlas',
    title: 'ShortCut Atlas',
    topics: ['shortcut atlas', 'url shortener', 'neon', 'express', 'links'],
    content:
      'ShortCut Atlas is Mark Erin’s deployed URL shortener for creating, copying, tracking, and redirecting compact links with persistent cloud storage. It has a public live deployment at short-cut-atlas.vercel.app. It uses React with Vite, Node.js with Express, Neon Postgres, and Vercel.',
  },
  {
    id: 'project-dorm-management',
    title: 'Dorm Management Website',
    topics: ['dorm', 'dorm management', 'hivemate', 'django', 'mysql', 'figma'],
    content:
      'Mark Erin’s dorm management academic project focused on usability and clear workflows. He designed the UI/UX in Figma, implemented the frontend with React and Tailwind CSS, and developed an API with Django REST Framework and MySQL. The public site is a frontend demonstration because its backend is not configured.',
  },
  {
    id: 'project-hardware',
    title: 'Hardware and embedded projects',
    topics: ['hardware', 'esp32', 'firefighting car', 'lan cable', 'pcb', 'digital logic', 'stored program'],
    content:
      'Mark Erin has built academic hardware projects including a stored-program control circuit for a four-wheel car kit, an ESP32-based autonomous firefighting car with sensors and obstacle avoidance, and a DIY Ethernet LAN cable checker designed through schematic, PCB layout, etching, and assembly.',
  },
]

export const publicSourceIds = new Set(profileKnowledge.map(({ id }) => id))

export function selectRelevantKnowledge(question, limit = 3) {
  const normalizedQuestion = question.toLowerCase()
  const scored = profileKnowledge.map((entry) => {
    const haystack = `${entry.title} ${entry.topics.join(' ')} ${entry.content}`.toLowerCase()
    const score = entry.topics.reduce(
      (total, topic) => total + (normalizedQuestion.includes(topic) ? 3 : 0),
      normalizedQuestion.split(/\W+/).reduce(
        (total, term) => total + (term.length > 2 && haystack.includes(term) ? 1 : 0),
        0,
      ),
    )

    return { entry, score }
  })

  const matches = scored
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ entry }) => entry)

  const namedProject = profileKnowledge.find(
    ({ id, topics }) =>
      id.startsWith('project-') &&
      topics.some((topic) => topic.length > 4 && normalizedQuestion.includes(topic.toLowerCase())),
  )

  if (namedProject) {
    return [namedProject, ...matches.filter(({ id }) => id !== namedProject.id)].slice(0, limit)
  }

  return matches.length > 0 ? matches : [profileKnowledge[0]]
}

export function hasExplicitKnowledgeMatch(question, knowledge) {
  const normalizedQuestion = question.toLowerCase()

  return knowledge.some(({ topics }) =>
    topics.some(
      (topic) => topic.length > 3 && normalizedQuestion.includes(topic.toLowerCase()),
    ),
  )
}
