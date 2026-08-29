import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Education } from '../models/education.model';
import { AppLanguage } from '../models/app-language.model';
@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private readonly http = inject(HttpClient);

  getAllEducations(language: AppLanguage): Observable<ApiResponse<Education[]>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<Education[]>>(API_ENDPOINTS.educations, { params });
  }
}
