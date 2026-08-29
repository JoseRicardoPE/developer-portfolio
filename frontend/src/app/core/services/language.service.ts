import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Language } from '../models/language.model';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly http = inject(HttpClient);

  getAllLanguages(language: AppLanguage): Observable<ApiResponse<Language[]>> {
    const params = new HttpParams().set('lang', language);
    return this.http.get<ApiResponse<Language[]>>(API_ENDPOINTS.languages, { params });
  }
}
