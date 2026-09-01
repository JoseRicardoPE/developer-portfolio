import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Profile as ProfileModel } from '../../core/models/profile.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faGlobe, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [
    Loading,
    ErrorMessage,
    FaIconComponent,
    TranslatePipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected readonly faLocationDot = faLocationDot;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faPhone = faPhone;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faGithub = faGithub;
  protected readonly faGlobe = faGlobe;
  private readonly profileService = inject(ProfileService);
  readonly profile = signal<ProfileModel | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('No fue posible cargar el perfil.');
        this.loading.set(false);
      },
    });
  }
}
