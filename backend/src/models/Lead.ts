import mongoose, { Document, Schema } from "mongoose";

// Mirrors the shape returned by the Gemini analysis
export interface ILeadProfile {
  company: string;
  contactPerson: string;
  fitScore: number;
  scoreReason: string;
  status: "highly_interested" | "qualified" | "outreach_sent";
}

export interface IGrowthStrategy extends Document {
  // Input fields
  businessName: string;
  industry: string;
  targetAudience?: string;
  description: string;

  // Gemini output fields
  projectedRevenue: string;
  projectedLeadsCount: string;
  qualificationRate: string;
  forecastInsights: string;
  leadsList: ILeadProfile[];
  emailSubjectLine: string;
  emailHtmlTemplate: string;
  acceleratedRevenueSteps: { step: string; details: string }[];

  createdAt: Date;
}

const LeadProfileSchema = new Schema<ILeadProfile>(
  {
    company: { type: String, required: true },
    contactPerson: { type: String, required: true },
    fitScore: { type: Number, required: true, min: 0, max: 100 },
    scoreReason: { type: String, required: true },
    status: {
      type: String,
      enum: ["highly_interested", "qualified", "outreach_sent"],
      default: "qualified",
    },
  },
  { _id: false }
);

const GrowthStrategySchema = new Schema<IGrowthStrategy>(
  {
    businessName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    targetAudience: { type: String, trim: true },
    description: { type: String, required: true, trim: true },

    projectedRevenue: { type: String, required: true },
    projectedLeadsCount: { type: String, required: true },
    qualificationRate: { type: String, required: true },
    forecastInsights: { type: String, required: true },
    leadsList: { type: [LeadProfileSchema], default: [] },
    emailSubjectLine: { type: String, required: true },
    emailHtmlTemplate: { type: String, required: true },
    acceleratedRevenueSteps: [
      {
        step: { type: String, required: true },
        details: { type: String, required: true },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

export const GrowthStrategy = mongoose.model<IGrowthStrategy>(
  "GrowthStrategy",
  GrowthStrategySchema
);
