import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import { connectDB } from "./config/db";
import { apiLimiter } from "./middleware/rateLimit";
import { errorHandler } from "./middleware/errorHandler";

import analyzeRoutes from "./routes/analyze";
import bookingRoutes from "./routes/bookings";
import waitlistRoutes from "./routes/waitlist";

const app = express();
const PORT = parseInt(process.env.PORT ?? "4000", 10);

// ─── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ──────────────────────────────────────────────────────────────────────
// Reads allowed origins from ALLOWED_ORIGINS env var (comma-separated).
// Falls back to localhost:3000 for local dev.
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) or listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} is not allowed.`));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ─── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));

// ─── Global rate limit ─────────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ─── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/analyze", analyzeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/waitlist", waitlistRoutes);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ─── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ─────────────────────────────────────────────────────────────────────
async function start() {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GrowthPilot API] Running on http://0.0.0.0:${PORT}`);
    console.log(`[CORS] Allowed origins: ${allowedOrigins.join(", ")}`);
  });
}

start().catch((err) => {
  console.error("[Startup Error]", err);
  process.exit(1);
});
