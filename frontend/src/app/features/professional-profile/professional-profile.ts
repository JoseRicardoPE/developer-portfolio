import { Component, effect, inject, signal } from '@angular/core';
import { ProfessionalProfileService } from '../../core/services/professional-profile.service';
import { ProfessionalProfile as ProfessionalProfileModel } from '../../core/models/professional-profile.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguage } from '../../core/models/app-language.model';
import { AppLanguageService } from '../../core/services/app-language.service';

@Component({
  selector: 'app-professional-profile',
  imports: [
    Loading,
    ErrorMessage,
    TranslatePipe
  ],
  templateUrl: './professional-profile.html',
  styleUrl: './professional-profile.scss',
})
export class ProfessionalProfile {
  private readonly professionalProfileService = inject(ProfessionalProfileService);
  private readonly appLanguageService = inject(AppLanguageService)
  readonly professionalProfile = signal<ProfessionalProfileModel | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadProfessionalProfile(language);
    })
  }

  private loadProfessionalProfile(language: AppLanguage): void {
    this.professionalProfileService.getProfessionalProfile(language).subscribe({
      next: (response) => {
        this.professionalProfile.set(response.data);
        this.loading.set(false);
      }, 
      error: (error) => {
        this.error.set('professionalProfile.error');
        this.loading.set(false);
      }
    })
  }
}
