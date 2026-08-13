import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { Experience as ExperienceModel } from '../../core/models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  private readonly experienceService = inject(ExperienceService);

  readonly experiences = signal<ExperienceModel[]>([]);

  ngOnInit(): void {
      this.experienceService.getAllExperiences().subscribe({
        next: (response) => {
          this.experiences.set(response.data);
        }, 
        error: (error) => {
          console.error('Error loading Experiences:', error);
        }
      })
  }
}
