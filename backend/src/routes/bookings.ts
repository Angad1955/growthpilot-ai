import { Router, Request, Response, NextFunction } from "express";
import { Booking } from "../models/Booking";

const router = Router();

/**
 * POST /api/bookings
 * Create a demo booking (from the "Book Demo" modal on the frontend).
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, company, preferredDate } = req.body as {
      name?: string;
      email?: string;
      company?: string;
      preferredDate?: string;
    };

    if (!name?.trim() || !email?.trim() || !company?.trim()) {
      res.status(400).json({ error: "name, email, and company are required." });
      return;
    }

    const booking = await Booking.create({ name, email, company, preferredDate });

    res.status(201).json({
      message: "Demo booking confirmed. Our team will reach out shortly.",
      id: booking._id,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/bookings
 * List all bookings (admin use — protect this in production with auth middleware).
 */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).select("-__v");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/bookings/:id/status
 * Update booking status (pending → confirmed | cancelled).
 */
router.patch(
  "/:id/status",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body as { status?: string };

      if (!["pending", "confirmed", "cancelled"].includes(status ?? "")) {
        res
          .status(400)
          .json({ error: "status must be pending, confirmed, or cancelled." });
        return;
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!booking) {
        res.status(404).json({ error: "Booking not found." });
        return;
      }

      res.json({ message: "Status updated.", booking });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
