export class ChatRequestError extends Error {
  constructor(message, retryAfterSeconds = 0) {
    super(message)
    this.name = 'ChatRequestError'
    this.retryAfterSeconds = retryAfterSeconds
  }
}

export async function askPortfolioAssistant(message, history = []) {
  let timeoutId
  const controller = new AbortController()

  try {
    timeoutId = window.setTimeout(() => controller.abort(), 20_000)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new ChatRequestError(payload.error || 'Unable to reach the portfolio assistant.', Number(payload.retryAfterSeconds) || 0)
    }

    return payload
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('The portfolio assistant took too long to respond. Please try again.', { cause: error })
    }
    throw error
  } finally {
    window.clearTimeout(timeoutId)
  }
}
