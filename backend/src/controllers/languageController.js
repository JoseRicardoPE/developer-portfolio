import * as languageService from "../services/languageService.js";
import { localizeLanguage } from "../utils/localizeLanguage.js";
import { isValidObjectId } from "mongoose";
import {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../services/languageService.js";

export async function getAllLanguagesController(req, res) {
  try {
    const selectedLanguage = req.query.lang === "en" ? "en" : "es";
    const languages = await languageService.getAllLanguages();
    const localizedLanguage = languages.map((language) => {
      return localizeLanguage(language, selectedLanguage);
    })
    res.status(200).json({ success: true, data: localizedLanguage });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving languages",
      error: error.message,
    });
  }
}

export async function getLanguageByIdController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid language ID" });
    }
    const selectedLanguage = req.query.lang === "en" ? "en" : "es";
    const languageData = await getLanguageById(req.params.id);
    if (!languageData) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }
    const localizedLanguage = localizeLanguage(languageData, selectedLanguage);
    res.status(200).json({ success: true, data: localizedLanguage });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving language",
      error: error.message,
    });
  }
}

export async function createLanguageController(req, res) {
  try {
    const languageData = await createLanguage(req.body);
    res.status(201).json({ success: true, data: languageData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating language",
      error: error.message,
    });
  }
}

export async function updateLanguageController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid language ID" });
    }

    const languageData = await updateLanguage(req.params.id, req.body);
    if (!languageData) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }
    res.status(200).json({ success: true, data: languageData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating language",
      error: error.message,
    });
  }
}

export async function deleteLanguageController(req, res) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid language ID" });
    }

    const languageData = await deleteLanguage(req.params.id);
    if (!languageData) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    }
    res.status(200).json({ success: true, data: languageData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting language",
      error: error.message,
    });
  }
}
