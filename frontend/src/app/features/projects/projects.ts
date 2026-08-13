import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project as ProjectModel } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private readonly projectService = inject(ProjectService);

  readonly projects = signal<ProjectModel[]>([]);

  ngOnInit(): void {
      this.projectService.getAllProjects().subscribe({
        next: (response) => {
          this.projects.set(response.data);
        },
        error: (error) => {
          console.error('Error loading projects:', error);
        }
      })
  }
}
