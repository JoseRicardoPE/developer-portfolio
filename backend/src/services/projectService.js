import project from "../models/project.model.js";

export async function getAllProjects() {
  return await project.find();
}

export async function getProjectById(id) {
  return await project.findById(id);
}

export async function createProject(projectData) {
  return await project.create(projectData);
}

export async function updateProject(id, projectData) {
  return await project.findByIdAndUpdate(id, projectData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteProject(id) {
  return await project.findByIdAndDelete(id);
}
