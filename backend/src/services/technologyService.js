import Technology from "../models/technology.model.js";

export async function getAllTechnologies() {
  return await Technology.find().lean();
}

export async function getTechnologyById(id) {
  return await Technology.findById(id).lean();
}

export async function createTechnology(technologyData) {
  return await Technology.create(technologyData);
}

export async function updateTechnology(id, technologyData) {
  return await Technology.findByIdAndUpdate(id, technologyData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteTechnology(id) {
  return await Technology.findByIdAndDelete(id);
}
