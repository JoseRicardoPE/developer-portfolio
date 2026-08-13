import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api.constants';
import { ApiResponse } from '../models/api-response.model';
import { Education } from '../models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private readonly http = inject(HttpClient);

  getAllEducations(): Observable<ApiResponse<Education[]>> {
    return this.http.get<ApiResponse<Education[]>>(API_ENDPOINTS.educations);
  }
}
