import { Component, effect, inject, signal } from '@angular/core';
import { ProjectService } from '../../core/services/project.service';
import { Project as ProjectModel } from '../../core/models/project.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";
import { TranslatePipe } from '@ngx-translate/core';
import { AppLanguage } from '../../core/models/app-language.model';
import { AppLanguageService } from '../../core/services/app-language.service';

@Component({
  selector: 'app-projects',
  imports: [
    Loading,
    ErrorMessage,
    TranslatePipe
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly appLanguageService = inject(AppLanguageService);
  private readonly projectService = inject(ProjectService);
  readonly projects = signal<ProjectModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const language = this.appLanguageService.language();
      this.loadProject(language);
    });
  }

  private loadProject(language: AppLanguage): void {
      this.projectService.getAllProjects(language).subscribe({
        next: (response) => {
          this.projects.set(response.data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('projects.error');
          this.loading.set(false);
        }
      })
  }
}
