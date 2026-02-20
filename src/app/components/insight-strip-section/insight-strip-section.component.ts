import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { INSIGHTS } from '../../content/site-content';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-insight-strip-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './insight-strip-section.component.html',
  styleUrl: './insight-strip-section.component.scss',
  animations: [
    trigger('fadeSwap', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('420ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class InsightStripSectionComponent implements OnInit, OnDestroy {
  readonly insights = INSIGHTS;

  currentIndex = 0;
  private intervalId: number | null = null;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.insights.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  show(index: number): void {
    this.currentIndex = index;
  }
}
