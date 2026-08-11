import { Router } from "express";
import {
  createProfileController,
  deleteProfileController,
  getProfileController,
  updateProfileController,
} from "../controllers/profileController.js";

const router = Router();

router.get("/", getProfileController);
router.post("/", createProfileController);
router.put("/", updateProfileController);
router.delete("/", deleteProfileController);

export default router;
