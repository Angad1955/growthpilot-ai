import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for live AI Lead Generation & Outreach Strategy Simulation
  app.post("/api/analyze", async (req, res) => {
    try {
      const { businessName, industry, targetAudience, description } = req.body;
      if (!businessName || !industry || !description) {
        return res.status(400).json({ error: "Missing required business details" });
      }

      // Initialize GoogleGenAI server-side with safe key
      const aiKey = process.env.GEMINI_API_KEY;
      if (!aiKey) {
        return res.status(401).json({
          error: "Your Gemini API key is missing. Please set your credentials in the Settings > Secrets menu."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: aiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const prompt = `Analyze this business and generate a custom B2B lead generation, qualification and outreach strategy:
Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience || "General B2B clients"}
Description: ${description}

Format the response strictly as a JSON object matching this schema:
{
  "projectedRevenue": "estimated annual ARR increase, e.g. +$180,000 ARR",
  "projectedLeadsCount": "estimated qualified monthly B2B leads, e.g. 145/mo",
  "qualificationRate": "percentage increase in qualification efficiency, e.g. +78%",
  "forecastInsights": "a single professional sentence explaining this forecast based on B2B signals",
  "leadsList": [
    {
      "company": "realistic benchmark company in their target market",
      "contactPerson": "contact person name (e.g. CEO, Head of Sales, CTO)",
      "fitScore": number between 75 and 100,
      "scoreReason": "detailed explanation of why they are high-intent based on firmographic intent signals",
      "status": "qualified"
    }
  ],
  "emailSubjectLine": "high-converting, personalized cold outreach email subject",
  "emailHtmlTemplate": "complete polished plain-text email with placeholder variables replaced where possible or brackets like [Name], designed for highest reply rate, specifically tailored to show how ${businessName} provides immediate value",
  "acceleratedRevenueSteps": [
    {
      "step": "Capture Leads",
      "details": "exactly how GrowthPilot AI will capture interest for ${businessName}"
    },
    {
      "step": "AI Qualification",
      "details": "how we qualify leads based on intent and firmographics for ${businessName}"
    },
    {
      "step": "Automated Follow-up",
      "details": "specific follow-up context sequence for ${businessName}"
    },
    {
      "step": "Convert Into Customers",
      "details": "how the final sales pitch is hand-off to their closers"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
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
                    status: { type: Type.STRING }
                  },
                  required: ["company", "contactPerson", "fitScore", "scoreReason", "status"]
                }
              },
              acceleratedRevenueSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.STRING },
                    details: { type: Type.STRING }
                  },
                  required: ["step", "details"]
                }
              }
            },
            required: [
              "projectedRevenue",
              "projectedLeadsCount",
              "qualificationRate",
              "forecastInsights",
              "leadsList",
              "emailSubjectLine",
              "emailHtmlTemplate",
              "acceleratedRevenueSteps"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini model.");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (err: any) {
      console.error("AI Analysis Error:", err);
      res.status(500).json({ error: err.message || "Failed to perform AI analysis. Check your Gemini API key." });
    }
  });

  // Vite asset-serving and dev server middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GrowthPilot Backend] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
