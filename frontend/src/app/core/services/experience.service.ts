import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Experience } from '../models/experience.model';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly http = inject(HttpClient);

  getAllExperiences(language: AppLanguage): Observable<ApiResponse<Experience[]>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<Experience[]>>(API_ENDPOINTS.experiences, { params });
  }
}
