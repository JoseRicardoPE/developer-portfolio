import { Router } from "express";
import {
  createProfessionalProfileController,
  deleteProfessionalProfileController,
  getProfessionalProfileController,
  updateProfessionalProfileController,
} from "../controllers/professionalProfileController.js";

const router = Router();

router.get("/", getProfessionalProfileController);
router.post("/", createProfessionalProfileController);
router.put("/", updateProfessionalProfileController);
router.delete("/", deleteProfessionalProfileController);

export default router;
