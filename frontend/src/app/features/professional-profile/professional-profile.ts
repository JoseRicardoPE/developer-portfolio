import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfessionalProfileService } from '../../core/services/professional-profile.service';
import { ProfessionalProfile as ProfessionalProfileModel } from '../../core/models/professional-profile.model';

@Component({
  selector: 'app-professional-profile',
  imports: [],
  templateUrl: './professional-profile.html',
  styleUrl: './professional-profile.scss',
})
export class ProfessionalProfile implements OnInit {
  private readonly professionalProfileService = inject(ProfessionalProfileService);

  readonly professionalProfile = signal<ProfessionalProfileModel | null>(null);

  ngOnInit(): void {
    this.professionalProfileService.getProfessionalProfile().subscribe({
      next: (response) => {
        this.professionalProfile.set(response.data);
      }, 
      error: (error) => {
        console.error('Error loading  professional profile:', error);
      }
    })
  }

}
