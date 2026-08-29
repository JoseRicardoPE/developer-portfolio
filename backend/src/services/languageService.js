import language from "../models/language.model.js";

export async function getAllLanguages() {
  return await language.find().lean();
}

export async function getLanguageById(id) {
  return await language.findById(id).lean();
}

export async function createLanguage(languageData) {
  return await language.create(languageData);
}

export async function updateLanguage(id, languageData) {
  return await language.findByIdAndUpdate(id, languageData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteLanguage(id) {
  return await language.findByIdAndDelete(id);
}
