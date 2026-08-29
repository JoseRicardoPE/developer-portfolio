import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Technology } from '../models/technology.model';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  private readonly http = inject(HttpClient);

  getAllTechnologies(language: AppLanguage): Observable<ApiResponse<Technology[]>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<Technology[]>>(API_ENDPOINTS.technologies, { params });
  }
}
