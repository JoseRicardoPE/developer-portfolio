import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly http = inject(HttpClient);

  getAllLanguages(): Observable<ApiResponse<Language[]>> {
    return this.http.get<ApiResponse<Language[]>>(API_ENDPOINTS.languages);
  }
}
