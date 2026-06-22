import mongoose, { Document, Schema } from "mongoose";

export interface IWaitlist extends Document {
  email: string;
  plan?: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    plan: {
      type: String,
      enum: ["Starter", "Growth", "Scale", "Enterprise"],
      default: "Growth",
    },
  },
  { timestamps: true }
);

export const Waitlist = mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);
