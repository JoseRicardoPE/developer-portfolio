import { Component, inject, OnInit, signal } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';
import { Language as LanguagesModel } from '../../core/models/language.model';

@Component({
  selector: 'app-languages',
  imports: [],
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class Languages implements OnInit {
  private readonly languageService = inject(LanguageService);

  readonly languages = signal<LanguagesModel[]>([]);

  ngOnInit(): void {
      this.languageService.getAllLanguages().subscribe({
        next: (response) => {
          this.languages.set(response.data);
        }, 
        error: (error) => {
          console.error('Error loading languages:', error);
        }
      })
  }
}
