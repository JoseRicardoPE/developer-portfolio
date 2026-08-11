import { isValidObjectId } from "mongoose";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService.js";

export async function getAllProjectsController(req, res) {
  try {
    const projects = await getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving projects",
      error: error.message,
    });
  }
}

export async function getProjectByIdController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID" });
    }

    const projectData = await getProjectById(req.params.id);
    if (!projectData) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: projectData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving project",
      error: error.message,
    });
  }
}

export async function createProjectController(req, res) {
  try {
    const projectData = await createProject(req.body);
    res.status(201).json({ success: true, data: projectData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
}

export async function updateProjectController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID" });
    }

    const projectData = await updateProject(req.params.id, req.body);
    if (!projectData) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: projectData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
}

export async function deleteProjectController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID" });
    }

    const projectData = await deleteProject(req.params.id);
    if (!projectData) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: projectData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
}
