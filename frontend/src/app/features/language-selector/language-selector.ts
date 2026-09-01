import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
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
  private readonly languageTrigger = viewChild<ElementRef<HTMLButtonElement>>('languageTrigger');
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
    this.languageTrigger()?.nativeElement.focus();
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.isOpen() && !this.elementRef.nativeElement.contains(target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    if (!this.isOpen()) {
      return;
    }
    event.stopPropagation();
    this.isOpen.set(false);
    this.languageTrigger()?.nativeElement.focus();
  }

  @HostListener('focusout', ['$event'])
  protected onFocusOut(event: FocusEvent): void {
    const nextFocusedElement = event.relatedTarget as Node | null;
    if (this.isOpen() && nextFocusedElement && !this.elementRef.nativeElement.contains(nextFocusedElement)) {
      this.isOpen.set(false);
    }
  }
}
