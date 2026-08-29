import { localizeField } from "./localizeField.js";

export function localizeEducation(education, language) {
  return {
    ...education,
    title: localizeField(education.title, language),
    contributions: localizeField(education.contributions, language),
  };
}
