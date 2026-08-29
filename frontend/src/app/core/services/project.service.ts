import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Project } from '../models/project.model';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);

  getAllProjects(language: AppLanguage): Observable<ApiResponse<Project[]>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<Project[]>>(API_ENDPOINTS.projects, { params });
  }
}
