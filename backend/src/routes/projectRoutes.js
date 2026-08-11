import { Router } from "express";
import {
  getAllProjectsController,
  getProjectByIdController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/projectController.js";

const router = Router();

router.get("/", getAllProjectsController);
router.get("/:id", getProjectByIdController);
router.post("/", createProjectController);
router.put("/:id", updateProjectController);
router.delete("/:id", deleteProjectController);

export default router;
