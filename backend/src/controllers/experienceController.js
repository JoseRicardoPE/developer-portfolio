import { isValidObjectId } from "mongoose";
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experienceService.js";

export async function getAllExperiencesController(req, res) {
  try {
    const experiences = await getAllExperiences();
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving experiences",
      error: error.message,
    });
  }
}

export async function getExperienceByIdController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid experience ID" });
    }

    const experienceData = await getExperienceById(req.params.id);
    if (!experienceData) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({ success: true, data: experienceData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving experience",
      error: error.message,
    });
  }
}

export async function createExperienceController(req, res) {
  try {
    const experienceData = await createExperience(req.body);
    res.status(201).json({ success: true, data: experienceData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating experience",
      error: error.message,
    });
  }
}

export async function updateExperienceController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid experience ID" });
    }

    const experienceData = await updateExperience(req.params.id, req.body);
    if (!experienceData) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({ success: true, data: experienceData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating experience",
      error: error.message,
    });
  }
}

export async function deleteExperienceController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid experience ID" });
    }

    const experienceData = await deleteExperience(req.params.id);
    if (!experienceData) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({ success: true, data: experienceData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting experience",
      error: error.message,
    });
  }
}
