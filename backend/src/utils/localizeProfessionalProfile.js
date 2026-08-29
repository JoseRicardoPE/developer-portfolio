import { localizeField } from "./localizeField.js";

export function localizeProfessionalProfile(professionalProfile, language) {
  return {
    ...professionalProfile,
    paragraphs: localizeField(professionalProfile.paragraphs, language),
  };
}
