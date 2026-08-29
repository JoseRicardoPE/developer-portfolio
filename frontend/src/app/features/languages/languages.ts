import { Component, effect, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { Language as LanguagesModel } from '../../core/models/language.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguage } from '../../core/models/app-language.model';
import { AppLanguageService } from '../../core/services/app-language.service';

@Component({
  selector: 'app-languages',
  imports: [
    Loading,
    ErrorMessage,
    TranslatePipe
  ],
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class Languages {
  private readonly languageService = inject(LanguageService);
  private readonly appLanguageService = inject(AppLanguageService);
  readonly languages = signal<LanguagesModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadLanguage(language);
    })
  }

  private loadLanguage(language: AppLanguage): void {
    this.languageService.getAllLanguages(language).subscribe({
      next: (response) => {
        this.languages.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('languages.error');
        this.loading.set(false);
      },
    });
  }
}
