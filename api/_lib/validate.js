import { publicSourceIds } from './knowledge.js'

export const MAX_MESSAGE_LENGTH = 500
export const MAX_HISTORY_MESSAGES = 6
export const MAX_HISTORY_MESSAGE_LENGTH = 700
export const MAX_HISTORY_LENGTH = 2_400

function normalizeHistory(history) {
  if (history === undefined) return { value: [] }

  if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES) {
    return { error: 'Chat history is invalid.' }
  }

  let totalLength = 0
  const normalizedHistory = []

  for (const entry of history) {
    if (!entry || typeof entry !== 'object' || !['user', 'assistant'].includes(entry.role) || typeof entry.text !== 'string') {
      return { error: 'Chat history is invalid.' }
    }

    const text = entry.text.trim().replace(/\s+/g, ' ')
    if (!text || text.length > MAX_HISTORY_MESSAGE_LENGTH) {
      return { error: 'Chat history is invalid.' }
    }

    totalLength += text.length
    if (totalLength > MAX_HISTORY_LENGTH) {
      return { error: 'Chat history is too long.' }
    }

    normalizedHistory.push({ role: entry.role, text })
  }

  return { value: normalizedHistory }
}

export function validateChatRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Send a JSON object containing a message.' }
  }

  if (typeof body.message !== 'string') {
    return { error: 'Message must be text.' }
  }

  const message = body.message.trim().replace(/\s+/g, ' ')
  if (!message) {
    return { error: 'Enter a question before sending.' }
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { error: `Keep questions under ${MAX_MESSAGE_LENGTH} characters.` }
  }

  const history = normalizeHistory(body.history)
  if (history.error) return history

  return { value: { message, history: history.value } }
}

export function parseModelJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function isScopeDecision(value) {
  return value && ['in_scope', 'out_of_scope', 'uncertain'].includes(value.decision)
}

export function validateAnswer(value) {
  if (!value || !['answer', 'refusal', 'unknown'].includes(value.type) || typeof value.answer !== 'string') {
    return null
  }

  const answer = value.answer.trim()
  if (!answer || answer.length > 1_200 || /<\/?[a-z][^>]*>/i.test(answer)) {
    return null
  }

  const sources = Array.isArray(value.sources)
    ? [...new Set(value.sources.filter((source) => typeof source === 'string' && publicSourceIds.has(source)))].slice(0, 3)
    : []

  return { type: value.type, answer, sources }
}
