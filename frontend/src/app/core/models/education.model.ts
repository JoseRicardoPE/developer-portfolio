import { EducationType } from "../enums/education-type.enum";

export interface Education {
    _id: string; 
    type: EducationType;
    title: string;
    institution: string;
    startDate: string | null;
    endDate: string | null;
    technologies: string[];
    contributions: string[];
    createdAt: string;
    updatedAt: string;
}