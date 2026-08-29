import { Component, effect, inject, signal } from '@angular/core';
import { EducationService } from '../../core/services/education.service';
import { Education as EducationModel } from '../../core/models/education.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguageService } from '../../core/services/app-language.service';
import { AppLanguage } from '../../core/models/app-language.model';

@Component({
  selector: 'app-education',
  imports: [Loading, ErrorMessage, TranslatePipe, DatePipe],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  private readonly educationService = inject(EducationService);
  private readonly appLanguageService = inject(AppLanguageService);
  protected readonly locale = this.appLanguageService.locale;
  readonly educations = signal<EducationModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadEducation(language);
    });
  }

  private loadEducation(language: AppLanguage): void {
    this.loading.set(true);
    this.error.set(null);
    this.educationService.getAllEducations(language).subscribe({
      next: (response) => {
        this.educations.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('education.error');
        this.loading.set(false);
      },
    });
  }
}
