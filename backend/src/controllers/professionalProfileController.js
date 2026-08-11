import {
  getProfessionalProfile,
  createProfessionalProfile,
  updateProfessionalProfile,
  deleteProfessionalProfile,
} from "../services/professionalProfileService.js";

export async function getProfessionalProfileController(req, res) {
  try {
    const professionalProfile = await getProfessionalProfile();
    if (!professionalProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Professional profile not found" });
    }
    res.status(200).json({ success: true, data: professionalProfile });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving professional profile",
      error: error.message,
    });
  }
}

export async function createProfessionalProfileController(req, res) {
  try {
    const professionalProfileData = await createProfessionalProfile(req.body);
    if (!professionalProfileData) {
      return res.status(409).json({
        success: false,
        message: "Professional profile already exists",
      });
    }
    res.status(201).json({ success: true, data: professionalProfileData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating professional profile",
      error: error.message,
    });
  }
}

export async function updateProfessionalProfileController(req, res) {
  try {
    const professionalProfileData = await updateProfessionalProfile(req.body);
    if (!professionalProfileData) {
      return res
        .status(404)
        .json({ success: false, message: "Professional profile not found" });
    }
    res.status(200).json({ success: true, data: professionalProfileData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating professional profile",
      error: error.message,
    });
  }
}

export async function deleteProfessionalProfileController(req, res) {
  try {
    const professionalProfileData = await deleteProfessionalProfile();
    if (!professionalProfileData) {
      return res
        .status(404)
        .json({ success: false, message: "Professional profile not found" });
    }
    res.status(200).json({ success: true, data: professionalProfileData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting professional profile",
      error: error.message,
    });
  }
}
