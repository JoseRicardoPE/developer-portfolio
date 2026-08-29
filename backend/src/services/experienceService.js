import Experience from "../models/experience.model.js";

export async function getAllExperiences() {
  return await Experience.find().lean();
}

export async function getExperienceById(id) {
  return await Experience.findById(id).lean();
}

export async function createExperience(experienceData) {
  return await Experience.create(experienceData);
}

export async function updateExperience(id, experienceData) {
  return await Experience.findByIdAndUpdate(id, experienceData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteExperience(id) {
  return await Experience.findByIdAndDelete(id);
}
