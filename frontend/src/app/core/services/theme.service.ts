import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'theme';

  private readonly currentTheme = signal<Theme>(this.getInitialTheme());

  private readonly colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  readonly theme = this.currentTheme.asReadonly();
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    this.applyTheme(this.currentTheme());
    this.colorSchemeQuery.addEventListener('change', this.onSystemThemeChange);
  }

  toggleTheme(): void {
    const nextTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(nextTheme);
    this.setTheme(nextTheme);
  }

  private applyTheme(theme: Theme): void {
    this.document.body.dataset['theme'] = theme;
  }

  private setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private readonly onSystemThemeChange = (event: MediaQueryListEvent): void => {
    const storedTheme = localStorage.getItem(this.storageKey);
    if (storedTheme) {
      return;
    }
    const systemTheme: Theme = event.matches ? 'dark' : 'light';
    this.currentTheme.set(systemTheme);
    this.applyTheme(systemTheme);
  };
}
