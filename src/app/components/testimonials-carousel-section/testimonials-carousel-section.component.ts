import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TESTIMONIALS } from '../../content/site-content';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials-carousel-section',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './testimonials-carousel-section.component.html',
  styleUrl: './testimonials-carousel-section.component.scss'
})
export class TestimonialsCarouselSectionComponent implements OnInit, OnDestroy {
  readonly testimonials = TESTIMONIALS;
  readonly stars = [1, 2, 3, 4, 5];

  currentIndex = 0;
  visibleCount = 3;

  private intervalId: number | null = null;
  private isPaused = false;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.updateVisibleCount();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) {
      return;
    }

    this.updateVisibleCount();
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
  }

  get maxIndex(): number {
    return Math.max(0, this.testimonials.length - this.visibleCount);
  }

  get pages(): number[] {
    return Array.from({ length: this.maxIndex + 1 }, (_, i) => i);
  }

  get statusText(): string {
    const start = this.currentIndex + 1;
    const end = Math.min(this.currentIndex + this.visibleCount, this.testimonials.length);
    return `Showing testimonials ${start} to ${end} of ${this.testimonials.length}`;
  }

  cardAriaLabel(index: number): string {
    return `Testimonial ${index + 1} of ${this.testimonials.length}`;
  }

  previous(): void {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.maxIndex;
      return;
    }

    this.currentIndex -= 1;
  }

  next(): void {
    if (this.currentIndex >= this.maxIndex) {
      this.currentIndex = 0;
      return;
    }

    this.currentIndex += 1;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  private updateVisibleCount(): void {
    const w = window.innerWidth;

    if (w <= 640) {
      this.visibleCount = 1;
      return;
    }

    if (w <= 980) {
      this.visibleCount = 2;
      return;
    }

    this.visibleCount = 3;
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.intervalId = window.setInterval(() => {
      if (this.isPaused) {
        return;
      }
      this.next();
    }, 4000);
  }

  private stopAutoplay(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
