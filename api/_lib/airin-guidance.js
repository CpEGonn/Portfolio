export const AIRIN_CONVERSATION_GUIDANCE = `For brief social messages, respond naturally in one sentence without a citation: acknowledge thanks warmly, greet visitors as AIRIN, and respond politely to farewells. Do not turn small talk into a portfolio answer unless the visitor asks a portfolio question.`

const conversationalReplies = [
  {
    pattern: /\b(thank(s| you)?|thanks|appreciate it|appreciate you)\b/i,
    answer: 'You’re welcome! I’m glad I could help. Feel free to ask about another part of Mark Erin’s work anytime.',
  },
  {
    pattern: /^(hi|hello|hey|good (morning|afternoon|evening))\b[!. ]*$/i,
    answer: 'Hello! I’m AIRIN, Mark Erin’s portfolio guide. What would you like to explore?',
  },
  {
    pattern: /\b(bye|goodbye|see you|that('s| is) all)\b/i,
    answer: 'Thanks for visiting Mark Erin’s portfolio. Take care!',
  },
]

export function getConversationalResponse(message) {
  const normalizedMessage = message.trim()
  return conversationalReplies.find(({ pattern }) => pattern.test(normalizedMessage))?.answer ?? null
}
