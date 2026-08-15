import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { MessageCircle, X } from 'lucide-react'
import { askPortfolioAssistant } from '../../lib/chat-api'
import botAvatar from '../../assets/bot-img.png'
import botAvatarDark from '../../assets/bot-img-dark.png'
import { getPreferredTheme } from '../../lib/theme'
import { cn } from '../../lib/utils'
import ChatComposer from './chat-composer'
import ChatMessage from './chat-message'
import ChatSuggestions from './chat-suggestions'

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi, I’m AIRIN—Mark Erin’s AI portfolio guide. I can answer questions about his background, skills, education, and projects.',
  sources: [],
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([welcomeMessage])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [cooldownUntil, setCooldownUntil] = useState(0)
  const [isUnavailable, setIsUnavailable] = useState(false)
  const [theme, setTheme] = useState(getPreferredTheme)
  const [isLauncherHovered, setIsLauncherHovered] = useState(false)
  const launcherRef = useRef(null)
  const dialogRef = useRef(null)
  const messagesEndRef = useRef(null)
  const activeBotAvatar = theme === 'light' ? botAvatarDark : botAvatar

  useEffect(() => {
    const themeObserver = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme || getPreferredTheme())
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => themeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    dialogRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!cooldownUntil) return undefined

    const timeout = window.setTimeout(() => {
      setCooldownUntil(0)
      setIsUnavailable(false)
    }, Math.max(0, cooldownUntil - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [cooldownUntil])

  function closeChat() {
    setIsOpen(false)
    window.setTimeout(() => launcherRef.current?.focus(), 0)
  }

  async function submitQuestion(eventOrQuestion) {
    eventOrQuestion?.preventDefault?.()
    const question = typeof eventOrQuestion === 'string' ? eventOrQuestion : message
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isLoading || isUnavailable) return

    setError('')
    setMessage('')
    const history = messages
      .filter((chatMessage) => chatMessage.id !== welcomeMessage.id)
      .slice(-6)
      .map(({ role, text }) => ({ role, text }))
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), role: 'user', text: trimmedQuestion },
    ])
    setIsLoading(true)

    try {
      const response = await askPortfolioAssistant(trimmedQuestion, history)
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: response.answer,
          sources: response.sources || [],
        },
      ])
    } catch (requestError) {
      if (requestError instanceof Error && requestError.retryAfterSeconds > 0) {
        setCooldownUntil(Date.now() + requestError.retryAfterSeconds * 1_000)
        setIsUnavailable(true)
      }
      setError(requestError instanceof Error ? requestError.message : 'Unable to reach the portfolio assistant.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-60 sm:right-6 sm:bottom-6">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/35"
            onClick={closeChat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <section
            ref={dialogRef}
            tabIndex={-1}
            aria-label="Chat with AIRIN"
            className="bg-surface border-primary/45 shadow-soft ring-primary/20 relative z-10 mb-3 flex h-[min(38rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border ring-1 outline-none"
          >
          <header className="border-border flex items-center gap-3 border-b px-5 py-3">
            <motion.img
              src={activeBotAvatar}
              alt="Portfolio assistant"
              className="h-12 w-12 shrink-0 origin-bottom object-contain"
              animate={{ y: [0, -2, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-primary text-base sm:text-xl font-semibold tracking-tight">AIRIN</h2>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="text-secondary hover:text-red-500 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors"
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="project-modal-scrollbar flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((chatMessage) => (
                <ChatMessage key={chatMessage.id} message={chatMessage} />
              ))}
              {messages.length === 1 && <ChatSuggestions onSelect={submitQuestion} />}
              {isLoading && (
                <div className="bg-card border-border text-muted w-fit rounded-3xl rounded-bl-lg border px-4 py-3 text-sm" aria-label="Assistant is thinking">
                  Thinking…
                </div>
              )}
              {error && <p className="text-muted rounded-2xl bg-card px-3 py-2 text-sm" role="status">{error}</p>}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <ChatComposer
            value={message}
            isLoading={isLoading}
            isUnavailable={isUnavailable}
            onChange={setMessage}
            onSubmit={submitQuestion}
          />
          </section>
        </>
      )}

      {!isOpen && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsLauncherHovered(true)}
          onMouseLeave={() => setIsLauncherHovered(false)}
          className={cn(
            'bg-surface border-primary/20 text-primary shadow-soft relative mt-10 inline-flex h-14 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-[background-color,border-color,color,transform] active:translate-y-0',
            isLauncherHovered && '-translate-y-0.5 border-primary bg-card',
          )}
          aria-label="Chat with AIRIN"
          aria-expanded={false}
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span>Chat with AIRIN</span>
          <motion.img
            src={activeBotAvatar}
            alt=""
            aria-hidden="true"
            className="absolute right-2 bottom-10 h-18 w-18 origin-bottom cursor-pointer object-contain"
            animate={{ y: [1, -3, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
            whileHover={{ scale: 1.08, rotate: 4 }}
            onHoverStart={() => setIsLauncherHovered(true)}
            onHoverEnd={() => setIsLauncherHovered(false)}
          />
        </button>
      )}
    </div>
  )
}

export default ChatWidget
