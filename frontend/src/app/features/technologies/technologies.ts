import { Component, inject, OnInit, signal } from '@angular/core';
import { TechnologyService } from '../../core/services/technology.service';
import { Technology } from '../../core/models/technology.model';

@Component({
  selector: 'app-technologies',
  imports: [],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies implements OnInit{
  private readonly technologyService = inject(TechnologyService);

  readonly technologies = signal<Technology[]>([]);

  ngOnInit(): void {
      this.technologyService.getAllTechnologies().subscribe({
        next: (response) => {
          this.technologies.set(response.data);
        },
        error: (error) => {
          console.error('Error loading technologies:', error);
        }
      })
  }
}
