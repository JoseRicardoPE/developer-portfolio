import education from "../models/education.model.js";

export async function getAllEducations() {
  return await education.find().lean();
}

export async function getEducationById(id) {
  return await education.findById(id).lean();
}

export async function createEducation(educationData) {
  return await education.create(educationData);
}

export async function updateEducation(id, educationData) {
  return await education.findByIdAndUpdate(id, educationData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteEducation(id) {
  return await education.findByIdAndDelete(id);
}
