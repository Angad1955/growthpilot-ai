import { Router, Request, Response, NextFunction } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import { analyzeLimiter } from "../middleware/rateLimit";
import { GrowthStrategy } from "../models/Lead";

const router = Router();

router.post(
  "/",
  analyzeLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { businessName, industry, targetAudience, description } = req.body as {
        businessName?: string;
        industry?: string;
        targetAudience?: string;
        description?: string;
      };

      if (!businessName?.trim() || !industry?.trim() || !description?.trim()) {
        res.status(400).json({
          error: "businessName, industry, and description are all required.",
        });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(503).json({
          error:
            "GEMINI_API_KEY is not configured on the server. Contact support.",
        });
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Analyze this business and generate a custom B2B lead generation, qualification and outreach strategy:
Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience || "General B2B clients"}
Description: ${description}

Format the response strictly as a JSON object matching the provided schema.
Ensure leadsList contains exactly 3 realistic benchmark companies.
Keep emailHtmlTemplate to plain-text (no actual HTML tags).`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectedRevenue: { type: Type.STRING },
              projectedLeadsCount: { type: Type.STRING },
              qualificationRate: { type: Type.STRING },
              forecastInsights: { type: Type.STRING },
              emailSubjectLine: { type: Type.STRING },
              emailHtmlTemplate: { type: Type.STRING },
              leadsList: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    company: { type: Type.STRING },
                    contactPerson: { type: Type.STRING },
                    fitScore: { type: Type.NUMBER },
                    scoreReason: { type: Type.STRING },
                    status: { type: Type.STRING },
                  },
                  required: [
                    "company",
                    "contactPerson",
                    "fitScore",
                    "scoreReason",
                    "status",
                  ],
                },
              },
              acceleratedRevenueSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.STRING },
                    details: { type: Type.STRING },
                  },
                  required: ["step", "details"],
                },
              },
            },
            required: [
              "projectedRevenue",
              "projectedLeadsCount",
              "qualificationRate",
              "forecastInsights",
              "leadsList",
              "emailSubjectLine",
              "emailHtmlTemplate",
              "acceleratedRevenueSteps",
            ],
          },
        },
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini.");

      const parsed = JSON.parse(text.trim());

      // Persist the strategy + inputs to MongoDB
      const saved = await GrowthStrategy.create({
        businessName,
        industry,
        targetAudience,
        description,
        ...parsed,
      });

      res.status(201).json({ id: saved._id, ...parsed });
    } catch (err) {
      next(err);
    }
  }
);

/** GET /api/analyze — retrieve previously generated strategies (latest 20) */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const strategies = await GrowthStrategy.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select("-emailHtmlTemplate -__v");

    res.json(strategies);
  } catch (err) {
    next(err);
  }
});

export default router;
