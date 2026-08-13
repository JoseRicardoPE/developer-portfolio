export interface Project {
    _id: string;
    name: string;
    description?: string;
    url?: string;
    technologies: string[];
    contributions: string[];
    repository?: string;
    relatedExperience?: string;
    createdAt: string;
    updatedAt: string;
}