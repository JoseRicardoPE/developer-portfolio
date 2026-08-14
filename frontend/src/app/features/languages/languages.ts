import { Component, inject, OnInit, signal } from '@angular/core';

import { LanguageService } from '../../core/services/language.service';
import { Language as LanguagesModel } from '../../core/models/language.model';
import { Loading } from "../../shared/components/loading/loading";
import { ErrorMessage } from "../../shared/components/error-message/error-message";

@Component({
  selector: 'app-languages',
  imports: [Loading, ErrorMessage],
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class Languages implements OnInit {
  private readonly languageService = inject(LanguageService);

  readonly languages = signal<LanguagesModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.languageService.getAllLanguages().subscribe({
      next: (response) => {
        this.languages.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('No fue posible cargar los idiomas.');
        this.loading.set(false);
      },
    });
  }
}
