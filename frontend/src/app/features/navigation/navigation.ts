import { Component, signal, ElementRef, HostListener, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NAVIGATION_ITEMS } from './data/navigation-items.data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  imports: [
    FaIconComponent,
    TranslatePipe,
],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
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

  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
}
