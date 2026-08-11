import { isValidObjectId } from "mongoose";
import {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationService.js";

export async function getAllEducationsController(req, res) {
  try {
    const educations = await getAllEducations();
    res.status(200).json({ success: true, data: educations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving educations",
      error: error.message,
    });
  }
}

export async function getEducationByIdController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid education ID" });
    }

    const educatiionData = await getEducationById(req.params.id);
    if (!educatiionData) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }
    res.status(200).json({ success: true, data: educatiionData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving education",
      error: error.message,
    });
  }
}

export async function createEducationController(req, res) {
  try {
    const educationData = await createEducation(req.body);
    res.status(201).json({ success: true, data: educationData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating education",
      error: error.message,
    });
  }
}

export async function updateEducationController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid education ID" });
    }

    const educationData = await updateEducation(req.params.id, req.body);
    if (!educationData) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }
    res.status(200).json({ success: true, data: educationData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating education",
      error: error.message,
    });
  }
}

export async function deleteEducationController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid education ID" });
    }

    const educationData = await deleteEducation(req.params.id);
    if (!educationData) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }
    res.status(200).json({ success: true, data: educationData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting education",
      error: error.message,
    });
  }
}
