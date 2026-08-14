import { Component, inject, OnInit, signal } from '@angular/core';
import { TechnologyService } from '../../core/services/technology.service';
import { Technology } from '../../core/models/technology.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";

@Component({
  selector: 'app-technologies',
  imports: [Loading, ErrorMessage],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies implements OnInit{
  private readonly technologyService = inject(TechnologyService);

  readonly technologies = signal<Technology[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
      this.technologyService.getAllTechnologies().subscribe({
        next: (response) => {
          this.technologies.set(response.data);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('No fue posible cargar las tecnologías.');
          this.loading.set(false);
        }
      })
  }
}
