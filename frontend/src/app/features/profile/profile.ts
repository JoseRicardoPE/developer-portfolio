import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Profile as ProfileModel } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private readonly profileService = inject(ProfileService)

  readonly profile = signal<ProfileModel | null>(null);

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile.set(response.data);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    })
  }
}
