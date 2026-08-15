import { SendHorizontal } from 'lucide-react'

function ChatComposer({ value, isLoading, isUnavailable, onChange, onSubmit }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-border border-t p-3">
      <label htmlFor="portfolio-chat-message" className="sr-only">
        Ask about Mark Erin’s portfolio
      </label>
      <div className="bg-card border-border focus-within:ring-primary/25 flex items-center gap-2 rounded-2xl border px-3 py-2 transition-shadow focus-within:ring-2">
        <input
          id="portfolio-chat-message"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AIRIN about Mark Erin’s information…"
          maxLength={500}
          disabled={isLoading || isUnavailable}
          className="text-text placeholder:text-muted h-9 flex-1 bg-transparent py-0 text-sm leading-normal outline-none disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || isUnavailable || !value.trim()}
          className="bg-primary text-bg hover:opacity-85 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send question"
        >
          <SendHorizontal size={17} aria-hidden="true" />
        </button>
      </div>
      
    </form>
  )
}

export default ChatComposer
