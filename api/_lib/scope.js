const REFUSAL =
  'I’m not quite sure what you mean. I’m AIRIN, and I can help with questions about Mark Erin’s projects, skills, background, or education. What would you like to know?'

const TASK_REFUSAL =
  'I’m not set up to build apps or complete tasks. I’m AIRIN, Mark Erin’s portfolio guide—ask me about his projects, skills, background, or education instead.'

const PROMPT_INJECTION_PATTERNS = [
  /ignore (all |any |the )?(previous|prior|above|system) (instructions|rules|prompt)/i,
  /reveal (the )?(system prompt|instructions|hidden prompt)/i,
  /act as|roleplay as|pretend (to be|you are)/i,
  /jailbreak|developer message|system message/i,
]

const TASK_PATTERNS = [
  /\b(write|create|generate|debug|fix|solve|code|translate|summarize|make|build)\b.*\b(for me|this|a |an )/i,
  /\b(weather|news|stock|recipe|homework|essay)\b/i,
]

export function getLocalScopeRejection(message) {
  if (PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(message))) {
    return REFUSAL
  }

  if (TASK_PATTERNS.some((pattern) => pattern.test(message))) {
    return TASK_REFUSAL
  }

  return null
}

export function refusalResponse(answer = REFUSAL) {
  return {
    type: 'refusal',
    answer,
    sources: [],
  }
}
