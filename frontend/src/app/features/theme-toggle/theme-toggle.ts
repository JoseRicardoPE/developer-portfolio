import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../core/services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    FaIconComponent,
    TranslatePipe
  ],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  protected readonly faMoon = faMoon;
  protected readonly faSun = faSun;
  
  private readonly themeService = inject(ThemeService);
  protected readonly isDark = this.themeService.isDark;

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
