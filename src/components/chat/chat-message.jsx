import { ExternalLink } from 'lucide-react'
import { cn } from '../../lib/utils'

const sourceLinks = {
  'profile-overview': { label: 'About Mark Erin', href: '#about' },
  'education-and-skills': { label: 'Skills & education', href: '#about' },
  'technology-toolkit': { label: 'Technology toolkit', href: '#about' },
  'portfolio-projects': { label: 'All projects', href: '#projects' },
  'project-job-screening': { label: 'Thesis project', href: '#projects' },
  'project-nextchika': { label: 'NextChika', href: '#projects' },
  'project-shortcut-atlas': { label: 'ShortCut Atlas', href: '#projects' },
  'project-dorm-management': { label: 'Dorm management', href: '#projects' },
  'project-hardware': { label: 'Hardware projects', href: '#projects' },
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  const availableSources = message.sources
    ?.map((source) => ({ source, link: sourceLinks[source] }))
    .filter(({ link }) => Boolean(link))

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-6',
          isUser
            ? 'bg-primary text-bg rounded-br-lg'
            : 'bg-card border-border text-text rounded-bl-lg border',
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>

        {!isUser && availableSources?.length > 0 && (
          <div className="border-border mt-3 flex flex-wrap gap-2 border-t pt-3">
            {availableSources.map(({ source, link }) => (
                <a
                  key={source}
                  href={link.href}
                  className="text-secondary hover:text-primary inline-flex items-center gap-1 text-xs font-medium transition-colors"
                >
                  {link.label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
