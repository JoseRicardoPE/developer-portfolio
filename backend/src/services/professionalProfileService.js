import ProfessionalProfile from "../models/professionalProfile.model.js";

export async function getProfessionalProfile() {
  return await ProfessionalProfile.findOne().lean();
}

export async function createProfessionalProfile(profileData) {
  const professionalProfile = await ProfessionalProfile.findOne();
  if (professionalProfile) {
    return null; // Professional profile already exists, return null to indicate failure
  }
  return await ProfessionalProfile.create(profileData);
}

export async function updateProfessionalProfile(profileData) {
  return await ProfessionalProfile.findOneAndUpdate({}, profileData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteProfessionalProfile() {
  return await ProfessionalProfile.findOneAndDelete();
}
