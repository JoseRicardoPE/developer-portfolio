import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model' 
import { ProfessionalProfile } from '../models/professional-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalProfileService {
  private readonly http = inject(HttpClient);

  getProfessionalProfile(): Observable<ApiResponse<ProfessionalProfile>> {
    return this.http.get<ApiResponse<ProfessionalProfile>>(API_ENDPOINTS.professionalProfile);
  }
}
