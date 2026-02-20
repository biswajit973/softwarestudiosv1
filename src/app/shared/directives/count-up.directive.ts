import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input({ required: true }) appCountUp = 0;
  @Input() countSuffix = '';
  @Input() countDurationMs = 1200;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private observer: IntersectionObserver | null = null;
  private started = false;
  private timerId: number | null = null;

  ngOnInit(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      this.render(this.appCountUp);
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (this.started) {
            return;
          }

          const visible = entries.some((entry) => entry.isIntersecting);
          if (!visible) {
            return;
          }

          this.started = true;
          this.observer?.disconnect();
          this.startAnimation();
        },
        { threshold: 0.35 }
      );

      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private startAnimation(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.render(this.appCountUp);
      return;
    }

    const steps = 40;
    const interval = Math.max(16, Math.floor(this.countDurationMs / steps));
    const increment = this.appCountUp / steps;
    let current = 0;

    this.timerId = window.setInterval(() => {
      current += increment;
      if (current >= this.appCountUp) {
        this.render(this.appCountUp);
        if (this.timerId !== null) {
          window.clearInterval(this.timerId);
          this.timerId = null;
        }
        return;
      }

      this.render(Math.round(current));
    }, interval);
  }

  private render(value: number): void {
    this.host.nativeElement.textContent = `${Math.round(value).toLocaleString('en-IN')}${this.countSuffix}`;
  }
}
