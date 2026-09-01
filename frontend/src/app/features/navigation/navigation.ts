import { DOCUMENT } from '@angular/common';
import { Component, signal, ElementRef, HostListener, inject, viewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NAVIGATION_ITEMS } from './data/navigation-items.data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [FaIconComponent, TranslatePipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  private readonly menuTrigger = viewChild<ElementRef<HTMLButtonElement>>('menuTrigger');
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  protected readonly faBars = faBars;
  protected readonly faXmark = faXmark;
  protected readonly faArrowUp = faArrowUp;
  protected readonly isOpen = signal(false);
  protected readonly showScrollTop = signal(false);
  protected readonly menuItems = NAVIGATION_ITEMS;

  protected toggleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.isOpen.set(false);
  }

  protected selectMenuItem(fragment: string): void {
    this.closeMenu();
    requestAnimationFrame(() => {
      const target = this.document.getElementById(fragment);
      target?.focus();
    });
  }

  protected scrollToTop(): void {
    const prefersReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduceMotion ? 'auto' : 'smooth',
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (this.isOpen() && !this.elementRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop.set(window.scrollY > 100);
  }

  @HostListener('keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    if (!this.isOpen()) {
      return;
    }
    event.stopPropagation();
    this.closeMenu();
    this.menuTrigger()?.nativeElement.focus();
  }

  @HostListener('focusout', ['$event'])
  protected onFocusOut(event: FocusEvent): void {
    const nextFocusedElement = event.relatedTarget as Node | null;
    if (
      this.isOpen() &&
      nextFocusedElement &&
      !this.elementRef.nativeElement.contains(nextFocusedElement)
    ) {
      this.isOpen.set(false);
    }
  }
}
