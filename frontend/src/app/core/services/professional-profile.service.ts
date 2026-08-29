import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model' 
import { ProfessionalProfile } from '../models/professional-profile.model';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfileService {
  private readonly http = inject(HttpClient);

  getProfessionalProfile(language: AppLanguage): Observable<ApiResponse<ProfessionalProfile>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<ProfessionalProfile>>(API_ENDPOINTS.professionalProfile, { params });
  }
}
