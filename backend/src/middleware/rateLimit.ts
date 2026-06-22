import rateLimit from "express-rate-limit";

/** General API rate limiter — 100 req / 15 min per IP */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

/** Stricter limiter for the AI analysis endpoint — 10 req / 15 min per IP */
export const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "AI analysis limit reached. Please wait before retrying." },
});
