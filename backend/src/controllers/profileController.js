import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../services/profileService.js";

export async function getProfileController(req, res) {
  try {
    const profile = await getProfile();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving profile",
      error: error.message,
    });
  }
}

export async function createProfileController(req, res) {
  try {
    const profileData = await createProfile(req.body);
    if (!profileData) {
      return res
        .status(409)
        .json({ success: false, message: "Profile already exists" });
    }
    res.status(201).json({ success: true, data: profileData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating profile",
      error: error.message,
    });
  }
}

export async function updateProfileController(req, res) {
  try {
    const profileData = await updateProfile(req.body);
    if (!profileData) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
}

export async function deleteProfileController(req, res) {
  try {
    const profileData = await deleteProfile();
    if (!profileData) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting profile",
      error: error.message,
    });
  }
}
