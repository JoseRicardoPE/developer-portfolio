import * as technologyService from "../services/technologyService.js";
import { localizeTechnology } from "../utils/localizeTechnology.js";
import { isValidObjectId } from "mongoose";
import {
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "../services/technologyService.js";

export async function getAllTechnologiesController(req, res) {
  try {
    const language = req.query.lang === "en" ? "en" : "es";
    const technologies = await technologyService.getAllTechnologies();
    const localizedTechnology = technologies.map((technology) => {
      return localizeTechnology(technology, language);
    });
    res.status(200).json({ success: true, data: localizedTechnology });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving technologies",
      error: error.message,
    });
  }
}

export async function getTechnologyByIdController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid technology ID" });
    }
    const language = req.query.lang === "en" ? "en" : "es";
    const technologyData = await getTechnologyById(req.params.id);
    if (!technologyData) {
      return res
        .status(404)
        .json({ success: false, message: "Technology not found" });
    }
    const localizedTechnology = localizeTechnology(technologyData, language)
    res.status(200).json({ success: true, data: localizedTechnology });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving technology",
      error: error.message,
    });
  }
}

export async function createTechnologyController(req, res) {
  try {
    const technologyData = await createTechnology(req.body);
    res.status(201).json({ success: true, data: technologyData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating technology",
      error: error.message,
    });
  }
}

export async function updateTechnologyController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid technology ID" });
    }

    const technologyData = await updateTechnology(req.params.id, req.body);
    if (!technologyData) {
      return res
        .status(404)
        .json({ success: false, message: "Technology not found" });
    }
    res.status(200).json({ success: true, data: technologyData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating technology",
      error: error.message,
    });
  }
}

export async function deleteTechnologyController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid technology ID" });
    }

    const technologyData = await deleteTechnology(req.params.id);
    if (!technologyData) {
      return res
        .status(404)
        .json({ success: false, message: "Technology not found" });
    }
    res.status(200).json({ success: true, data: technologyData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting technology",
      error: error.message,
    });
  }
}
