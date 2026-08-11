import { Router } from "express";
import {
  getAllLanguagesController,
  getLanguageByIdController,
  createLanguageController,
  updateLanguageController,
  deleteLanguageController,
} from "../controllers/languageController.js";

const router = Router();

router.get("/", getAllLanguagesController);
router.get("/:id", getLanguageByIdController);
router.post("/", createLanguageController);
router.put("/:id", updateLanguageController);
router.delete("/:id", deleteLanguageController);

export default router;
