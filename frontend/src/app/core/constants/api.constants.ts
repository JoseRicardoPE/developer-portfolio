import { environment } from "../../../environments/environment";

const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  profile: `${API_BASE_URL}/profile`,
  professionalProfile: `${API_BASE_URL}/professional-profile`,
  technologies: `${API_BASE_URL}/technologies`,
  experiences: `${API_BASE_URL}/experiences`,
  projects: `${API_BASE_URL}/projects`,
  educations: `${API_BASE_URL}/educations`,
  languages: `${API_BASE_URL}/languages`,
} as const;