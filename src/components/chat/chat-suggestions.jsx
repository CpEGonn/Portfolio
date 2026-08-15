const suggestions = [
  'What projects has Mark Erin built?',
  'What technologies does Mark Erin use?',
  'Tell me about Mark Erin’s projects.',
]

function ChatSuggestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="bg-surface border-border text-secondary hover:bg-card hover:text-primary cursor-pointer rounded-full border px-3 py-2 text-left text-sm leading-6 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

export default ChatSuggestions
