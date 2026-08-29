import { Component, effect, inject, signal } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { Experience as ExperienceModel } from '../../core/models/experience.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { DatePipe } from '@angular/common';
import { AppLanguageService } from '../../core/services/app-language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguage } from '../../core/models/app-language.model';

@Component({
  selector: 'app-experience',
  imports: [
    Loading,
    ErrorMessage,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly experienceService = inject(ExperienceService);
  private readonly appLanguageService = inject(AppLanguageService);
  protected readonly locale = this.appLanguageService.locale;
  readonly experiences = signal<ExperienceModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadExperiences(language);
    });
  }

  private loadExperiences(language: AppLanguage): void {
    this.loading.set(true);
    this.error.set(null);
    this.experienceService.getAllExperiences(language).subscribe({
      next: (response) => {
        this.experiences.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('experience.error');
        this.loading.set(false);
      },
    });
  }
}
