import { Router } from "express";
import {
  getAllTechnologiesController,
  getTechnologyByIdController,
  createTechnologyController,
  updateTechnologyController,
  deleteTechnologyController,
} from "../controllers/technologyController.js";

const router = Router();

router.get("/", getAllTechnologiesController);
router.get("/:id", getTechnologyByIdController);
router.post("/", createTechnologyController);
router.put("/:id", updateTechnologyController);
router.delete("/:id", deleteTechnologyController);

export default router;
