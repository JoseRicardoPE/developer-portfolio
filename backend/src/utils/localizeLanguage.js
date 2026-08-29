import { localizeField } from "./localizeField.js";

export function localizeLanguage(language, selectedLanguage) {
    return {
        ...language,
        language: localizeField(language.language, selectedLanguage),
        level: localizeField(language.level, selectedLanguage),
        description: localizeField(language.description, selectedLanguage)
    }
}