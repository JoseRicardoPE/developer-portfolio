import { Component, inject, OnInit, signal } from '@angular/core';
import { EducationService } from '../../core/services/education.service';
import { Education as EducationModel } from '../../core/models/education.model';
import { Loading } from '../../shared/components/loading/loading';
import { ErrorMessage } from '../../shared/components/error-message/error-message';

@Component({
  selector: 'app-education',
  imports: [Loading, ErrorMessage],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education implements OnInit {
  private readonly educationService = inject(EducationService);

  readonly educations = signal<EducationModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.educationService.getAllEducations().subscribe({
      next: (response) => {
        this.educations.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('No fue posible cargar la formación académica.');
        this.loading.set(false);
      },
    });
  }
}
