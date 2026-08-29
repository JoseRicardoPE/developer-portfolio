import { localizeField } from "./localizeField.js";

export function localizeTechnology(technology, language) {
  return {
    ...technology,
    category: localizeField(technology.category, language),
  };
}
