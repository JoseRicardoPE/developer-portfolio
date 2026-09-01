import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { APP_LOCALES } from '../constants/app-locale.constants';
import { AppLanguage } from '../models/app-language.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AppLanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'app-language';
  private readonly translateService = inject(TranslateService);
  private readonly currentLanguage = signal<AppLanguage>(this.getInitialLanguage());
  readonly language = this.currentLanguage.asReadonly();
  readonly locale = computed(() => APP_LOCALES[this.currentLanguage()]);

  constructor() {
    const language = this.currentLanguage();
    this.translateService.use(language);
    this.setDocumentLanguage(language);
  }

  setLanguage(language: AppLanguage): void {
    this.currentLanguage.set(language);
    localStorage.setItem(this.storageKey, language);
    this.translateService.use(language);
    this.setDocumentLanguage(language);
  }

  private setDocumentLanguage(language: AppLanguage): void {
    this.document.documentElement.lang = language;
  }

  private getInitialLanguage(): AppLanguage {
    const storedLanguage = localStorage.getItem(this.storageKey);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }
    return 'es';
  }
}
