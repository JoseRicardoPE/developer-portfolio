import { localizeField } from "./localizeField.js";

export function localizeProject(project, language) {
  return {
    ...project,
    name: localizeField(project.name, language),
    description: localizeField(project.description, language),
    contributions: localizeField(project.contributions, language)
  };
}