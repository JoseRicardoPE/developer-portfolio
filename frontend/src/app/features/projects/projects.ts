import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project as ProjectModel } from '../../core/models/project.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";

@Component({
  selector: 'app-projects',
  imports: [Loading, ErrorMessage],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private readonly projectService = inject(ProjectService);

  readonly projects = signal<ProjectModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
      this.projectService.getAllProjects().subscribe({
        next: (response) => {
          this.projects.set(response.data);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('No fue posible cargar los proyectos.');
          this.loading.set(false);
        }
      })
  }
}
