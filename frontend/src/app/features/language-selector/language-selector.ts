import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { AppLanguage } from '../../core/models/app-language.model';
import { AppLanguageService } from '../../core/services/app-language.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  imports: [
    FaIconComponent,
    TranslatePipe
  ],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
})
export class LanguageSelector {
  private readonly appLanguageService = inject(AppLanguageService);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly faGlobeAmericas = faGlobeAmericas;
  protected readonly isOpen = signal(false);
  protected readonly language = this.appLanguageService.language;

  protected toggleDropdown(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  protected selectLanguage(language: AppLanguage): void {
    this.appLanguageService.setLanguage(language);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.isOpen() && !this.elementRef.nativeElement.contains(target)) {
      this.isOpen.set(false);
    }
  }
}
