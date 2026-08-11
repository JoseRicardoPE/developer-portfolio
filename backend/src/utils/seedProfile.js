import dotenv from "dotenv";
import { connectToDataBase } from "../config/database.js";
import Profile from "../models/profile.model.js";

dotenv.config();

await connectToDataBase();

await Profile.create({
  name: "Jose Ricardo",
  lastname: "Pacheco Escobar",
  title: "Frontend Engineer (Angular)",
  subtitle: "Angular • UI Developer",
  location: "Bogotá, Colombia",
  email: "ricardo.pachecescobar@gmail.com",
  phone: "+57 311 236 0676",
  linkedin: "https://www.linkedin.com/in/ricardo-pacheco-escobar",
  github: "https://github.com/JoseRicardoPE",
});

console.log("Profile created successfully");
