import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly http = inject(HttpClient);

  getAllExperiences(): Observable<ApiResponse<Experience[]>> {
    return this.http.get<ApiResponse<Experience[]>>(API_ENDPOINTS.experiences);
  }
}
