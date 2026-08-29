import * as projectService from "../services/projectService.js";
import { localizeProject } from '../utils/localizeProject.js';
import { isValidObjectId } from "mongoose";
import {
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService.js";

export async function getAllProjectsController(req, res) {
  try {
    const language = req.query.lang === "en" ? "en" : "es";
    const projects = await projectService.getAllProjects();
    const localizedProject = projects.map((project) => {
      return localizeProject(project, language);
    });
    res.status(200).json({ success: true, data: localizedProject });
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
    const language = req.query.lang === "en" ? "en" : "es";
    const projectData = await getProjectById(req.params.id);
    if (!projectData) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    const localizedProject = localizeProject(projectData, language);
    res.status(200).json({ success: true, data: localizedProject });
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
