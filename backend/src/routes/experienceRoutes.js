import { Router } from "express";
import {
  getAllExperiencesController,
  getExperienceByIdController,
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
} from "../controllers/experienceController.js";

const router = Router();

router.get("/", getAllExperiencesController);
router.get("/:id", getExperienceByIdController);
router.post("/", createExperienceController);
router.put("/:id", updateExperienceController);
router.delete("/:id", deleteExperienceController);

export default router;
