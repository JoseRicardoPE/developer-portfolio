import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Profile as ProfileModel } from '../../core/models/profile.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';

@Component({
  selector: 'app-profile',
  imports: [Loading, ErrorMessage],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
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
