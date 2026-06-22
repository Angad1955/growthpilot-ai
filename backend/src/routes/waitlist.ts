import { Router, Request, Response, NextFunction } from "express";
import { Waitlist } from "../models/Waitlist";

const router = Router();

/**
 * POST /api/waitlist
 * Sign up an email for early access / pricing plan waitlist.
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, plan } = req.body as { email?: string; plan?: string };

    if (!email?.trim()) {
      res.status(400).json({ error: "email is required." });
      return;
    }

    // Gracefully handle duplicate sign-ups
    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ message: "You're already on the waitlist!" });
      return;
    }

    const entry = await Waitlist.create({ email, plan });

    res.status(201).json({
      message: "You're on the waitlist. We'll notify you when a spot opens.",
      id: entry._id,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/waitlist/count
 * Public endpoint — returns the total sign-up count (useful for social proof).
 */
router.get(
  "/count",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await Waitlist.countDocuments();
      res.json({ count });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
