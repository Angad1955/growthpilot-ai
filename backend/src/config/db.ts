import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  await mongoose.connect(uri);
  isConnected = true;
  console.log("[MongoDB] Connected to Atlas.");

  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected. Reconnecting...");
    isConnected = false;
  });
}
