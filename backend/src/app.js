import express from "express";
import cors from "cors";
import morgan from "morgan";

import profileRoutes from "./routes/profileRoutes.js";
import professionalProfileRoutes from "./routes/professionalProfileRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/professional-profile", professionalProfileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/languages", languageRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Developer portfolio API is running!" });
});

export default app;
