import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const WINDOW = '1 h'
const LIMIT = process.env.NODE_ENV === 'production' ? 12 : 60
const GEMINI_COOLDOWN_KEY = 'portfolio-chat:gemini-cooldown'
const DEFAULT_GEMINI_COOLDOWN_SECONDS = 120
let developmentRequests = new Map()
let developmentGeminiCooldownUntil = 0

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  return (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() || 'unknown'
}

function getRedis() {
  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  return new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN })
}

function getDistributedLimiter() {
  const redis = getRedis()
  if (!redis) return null

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
    prefix: 'portfolio-chat',
  })
}

export function getGeminiCooldownDuration() {
  const configured = Number(process.env.GEMINI_COOLDOWN_SECONDS)
  if (!Number.isFinite(configured)) return DEFAULT_GEMINI_COOLDOWN_SECONDS
  return Math.min(600, Math.max(30, Math.floor(configured)))
}

export async function getGeminiCooldown() {
  const redis = getRedis()

  if (redis) {
    try {
      const ttl = await redis.ttl(GEMINI_COOLDOWN_KEY)
      return Number.isFinite(ttl) && ttl > 0 ? ttl : 0
    } catch {
      // Continue with the per-instance fallback if Redis is temporarily unavailable.
    }
  }

  return Math.max(0, Math.ceil((developmentGeminiCooldownUntil - Date.now()) / 1_000))
}

export async function startGeminiCooldown() {
  const seconds = getGeminiCooldownDuration()
  const redis = getRedis()

  if (redis) {
    try {
      await redis.set(GEMINI_COOLDOWN_KEY, '1', { ex: seconds })
      return seconds
    } catch {
      // Keep a local cooldown as a last line of defense during a Redis outage.
    }
  }

  developmentGeminiCooldownUntil = Date.now() + seconds * 1_000
  return seconds
}

export async function checkRateLimit(req) {
  const identifier = getClientIp(req)
  const limiter = getDistributedLimiter()

  if (limiter) {
    return limiter.limit(identifier)
  }

  if (process.env.NODE_ENV === 'production') {
    return { success: false, reset: Date.now() + 60_000, reason: 'rate-limit-not-configured' }
  }

  const now = Date.now()
  const current = developmentRequests.get(identifier)
  const reset = current?.reset > now ? current.reset : now + 60 * 60 * 1_000
  const count = reset === current?.reset ? current.count + 1 : 1
  developmentRequests.set(identifier, { count, reset })

  if (developmentRequests.size > 500) {
    developmentRequests = new Map([...developmentRequests].filter(([, value]) => value.reset > now))
  }

  return { success: count <= LIMIT, reset }
}
