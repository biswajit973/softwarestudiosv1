import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SoftwareStudiosLogoComponent } from '../../components/logo/software-studios-logo.component';
import { SOFTWARE_STUDIOS_BLOGS } from '../blogs/blog-data';
import { BlogSection, BlogTopic } from '../blogs/blog.model';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective, SoftwareStudiosLogoComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly topics = signal<readonly BlogTopic[]>(SOFTWARE_STUDIOS_BLOGS);
  readonly slug = signal('');
  readonly loading = signal(true);

  readonly index = computed(() => this.topics().findIndex((item) => item.slug === this.slug()));

  readonly topic = computed<BlogTopic | null>(() => {
    const i = this.index();
    return i >= 0 ? this.topics()[i] ?? null : null;
  });

  readonly prevTopic = computed<BlogTopic | null>(() => {
    const i = this.index();
    return i > 0 ? this.topics()[i - 1] ?? null : null;
  });

  readonly nextTopic = computed<BlogTopic | null>(() => {
    const i = this.index();
    return i >= 0 && i < this.topics().length - 1 ? this.topics()[i + 1] ?? null : null;
  });

  constructor() {
    combineLatest([this.route.paramMap])
      .pipe(takeUntilDestroyed())
      .subscribe(([params]) => {
        const slug = params.get('slug')?.trim() ?? '';
        this.slug.set(slug);
        this.loading.set(false);

        if (!this.topics().some((item) => item.slug === slug)) {
          this.router.navigate(['/blogs'], { replaceUrl: true });
          return;
        }

        this.scrollTop();
      });
  }

  openTopic(slug: string): void {
    this.router.navigate(['/blogs', slug]);
  }

  shortTitle(text: string): string {
    return text.length <= 32 ? text : `${text.slice(0, 32)}...`;
  }

  trackSection(index: number, section: BlogSection): string {
    return `${index}-${section.heading}`;
  }

  private scrollTop(): void {
    if (!this.isBrowser) {
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
}
