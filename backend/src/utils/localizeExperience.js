import { localizeField } from "./localizeField.js";

export function localizeExperience(experience, language) {
  return {
    ...experience,
    position: localizeField(experience.position, language),
    responsibilities: localizeField(experience.responsibilities, language),
  };
}
