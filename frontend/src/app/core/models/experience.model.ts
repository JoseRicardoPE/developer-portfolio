export interface Experience {
    _id: string;
    position: string; 
    company: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    responsibilities: string[];
    createdAt: string;
    updatedAt: string;
}