import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { Experience as ExperienceModel } from '../../core/models/experience.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [Loading, ErrorMessage, DatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  private readonly experienceService = inject(ExperienceService);

  readonly experiences = signal<ExperienceModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.experienceService.getAllExperiences().subscribe({
      next: (response) => {
        this.experiences.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('No fue posible cargar la experiencia profesional');
        this.loading.set(false);
      },
    });
  }
}
