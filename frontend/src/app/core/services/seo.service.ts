import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SeoMetadata } from '../models/seo-metadata.model';
import { AppLanguage } from '../models/app-language.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translateService = inject(TranslateService);
  private readonly siteUrl = 'https://fullstackricardo.com/';
  private readonly ogImageUrl = 'https://fullstackricardo.com/images/og-image.png';

  updateMetadata(language: AppLanguage): void {
    this.translateService
      .get(['seo.title', 'seo.description'])
      .subscribe((translations) => {
        const metadata: SeoMetadata = {
          title: translations['seo.title'],
          description: translations['seo.description'],
        };

        this.applyMetadata(metadata, language);
      });
  }

  private applyMetadata(metadata: SeoMetadata, language: AppLanguage): void {
    this.title.setTitle(metadata.title);

    this.meta.updateTag({
      name: 'description',
      content: metadata.description,
    });

    this.meta.updateTag({
      property: 'og:title',
      content: metadata.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: metadata.description,
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:url',
      content: this.siteUrl,
    });

    this.meta.updateTag({
      property: 'og:image',
      content: this.ogImageUrl,
    });

    this.meta.updateTag({
      property: 'og:image:alt',
      content: metadata.title,
    });

    this.meta.updateTag({
      property: 'og:locale',
      content: language === 'es' ? 'es_CO' : 'en_US',
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: metadata.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: metadata.description,
    });

    this.meta.updateTag({
      name: 'twitter:image',
      content: this.ogImageUrl,
    });

    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: metadata.title,
    });

    this.updateCanonical();
  }

  private updateCanonical(): void {
    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = this.siteUrl;
  }
}