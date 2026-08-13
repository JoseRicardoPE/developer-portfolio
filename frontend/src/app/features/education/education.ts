import { Component, inject, OnInit, signal } from '@angular/core';
import { EducationService } from '../../core/services/education.service';
import { Education as EducationModel } from '../../core/models/education.model';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education implements OnInit {
  private readonly educationService = inject(EducationService);

  readonly educations = signal<EducationModel[]>([]);

  ngOnInit(): void {
      this.educationService.getAllEducations().subscribe({
        next: (response) => {
          this.educations.set(response.data);
        },
        error: (error) => {
          console.error('Error loading educations:', error);
        }
      })
  }
}
