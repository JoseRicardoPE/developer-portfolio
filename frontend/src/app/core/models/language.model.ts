import { LanguageType } from "../enums/language-type.enum";
export interface Language {
    _id: string;
    language: string;
    code: LanguageType;
    level: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}