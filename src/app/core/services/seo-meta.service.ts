import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoRouteMeta } from '../../content/site-content';

@Injectable({ providedIn: 'root' })
export class SeoMetaService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(metaInfo: SeoRouteMeta, path: string): void {
    this.title.setTitle(metaInfo.title);

    this.meta.updateTag({ name: 'description', content: metaInfo.description });
    this.meta.updateTag({ property: 'og:title', content: metaInfo.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: metaInfo.ogDescription });
    this.meta.updateTag({ property: 'og:image', content: metaInfo.ogImage });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://softwarestudios.in${path}` });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: metaInfo.ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: metaInfo.ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: metaInfo.ogImage });

    this.updateCanonical(path);
  }

  setHomeStructuredData(): void {
    const scriptId = 'software-studios-jsonld';
    const existing = this.document.getElementById(scriptId);
    if (existing) {
      return;
    }

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Software Studios',
      alternateName: 'Software Studios - A Kkreative Company',
      url: 'https://softwarestudios.in',
      telephone: '+91 63709 31250',
      email: 'hello@softwarestudios.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'White House, 1st & 2nd Floors, Khairatabad',
        addressLocality: 'Hyderabad',
        addressCountry: 'IN'
      },
      parentOrganization: {
        '@type': 'Organization',
        name: 'Kkreative'
      }
    });

    this.document.head.appendChild(script);
  }

  private updateCanonical(path: string): void {
    const href = `https://softwarestudios.in${path}`;
    let link = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = href;
  }
}
