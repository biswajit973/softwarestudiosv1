import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HOME_FEATURED_INDUSTRIES_LIMIT,
  INDUSTRIES
} from '../../content/site-content';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { PrimaryCtaComponent } from '../cta-buttons/primary-cta.component';

@Component({
  selector: 'app-industries-grid-section',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    RevealOnScrollDirective,
    PrimaryCtaComponent
  ],
  templateUrl: './industries-grid-section.component.html',
  styleUrl: './industries-grid-section.component.scss'
})
export class IndustriesGridSectionComponent {
  readonly featuredIndustries = INDUSTRIES.slice(0, HOME_FEATURED_INDUSTRIES_LIMIT);
  readonly hiddenCount = Math.max(0, INDUSTRIES.length - this.featuredIndustries.length);
}
