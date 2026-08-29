import { Component, effect, inject, signal } from '@angular/core';
import { TechnologyService } from '../../core/services/technology.service';
import { Technology } from '../../core/models/technology.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguage } from '../../core/models/app-language.model';
import { AppLanguageService } from '../../core/services/app-language.service';

@Component({
  selector: 'app-technologies',
  imports: [
    Loading,
    ErrorMessage,
    TranslatePipe
  ],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {
  private readonly appLanguageService = inject(AppLanguageService);
  private readonly technologyService = inject(TechnologyService);
  readonly technologies = signal<Technology[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadTechnologies(language);
    });
  }

  private loadTechnologies(language: AppLanguage): void {
    this.loading.set(true);
    this.error.set(null);
    this.technologyService.getAllTechnologies(language).subscribe({
      next: (response) => {
        this.technologies.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('technologies.error');
        this.loading.set(false);
      },
    });
  }
}
