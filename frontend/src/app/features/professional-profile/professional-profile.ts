import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfessionalProfileService } from '../../core/services/professional-profile.service';
import { ProfessionalProfile as ProfessionalProfileModel } from '../../core/models/professional-profile.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";

@Component({
  selector: 'app-professional-profile',
  imports: [Loading, ErrorMessage],
  templateUrl: './professional-profile.html',
  styleUrl: './professional-profile.scss',
})
export class ProfessionalProfile implements OnInit {
  private readonly professionalProfileService = inject(ProfessionalProfileService);

  readonly professionalProfile = signal<ProfessionalProfileModel | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.professionalProfileService.getProfessionalProfile().subscribe({
      next: (response) => {
        this.professionalProfile.set(response.data);
        this.loading.set(false);
      }, 
      error: (error) => {
        this.error.set('No fue posible cargar el perfil profesional.');
        this.loading.set(false);
      }
    })
  }

}
