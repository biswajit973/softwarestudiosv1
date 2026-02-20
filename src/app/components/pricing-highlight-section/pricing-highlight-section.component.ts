import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PRICING_HIGHLIGHT } from '../../content/site-content';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { PrimaryCtaComponent } from '../cta-buttons/primary-cta.component';
import { SecondaryCtaComponent } from '../cta-buttons/secondary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-pricing-highlight-section',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    PrimaryCtaComponent,
    SecondaryCtaComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './pricing-highlight-section.component.html',
  styleUrl: './pricing-highlight-section.component.scss'
})
export class PricingHighlightSectionComponent {
  readonly pricing = PRICING_HIGHLIGHT;
}
