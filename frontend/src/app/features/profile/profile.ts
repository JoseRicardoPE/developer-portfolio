import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Profile as ProfileModel } from '../../core/models/profile.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [Loading, ErrorMessage, FaIconComponent, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected readonly faLocationDot = faLocationDot;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faWhatsapp = faWhatsapp;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faGithub = faGithub;
  protected readonly faGlobe = faGlobe;
  private readonly profileService = inject(ProfileService);
  private readonly translateService = inject(TranslateService);
  readonly profile = signal<ProfileModel | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('profile.error');
        this.loading.set(false);
      },
    });
  }

  protected getWhatsappUrl(phone: string): string {
    const phoneNumber = phone.replace(/\D/g, '');
    const message = this.translateService.instant('profile.whatsappMessage');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  protected getEmailUrl(email: string): string {
    const subject = this.translateService.instant('profile.emailSubject');
    const body = this.translateService.instant('profile.emailBody');
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
