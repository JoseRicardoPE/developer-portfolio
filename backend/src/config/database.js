import mongoose from "mongoose";

export async function connectToDataBase() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected successfully");
}
