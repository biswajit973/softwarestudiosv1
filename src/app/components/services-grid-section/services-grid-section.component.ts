import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HOME_FEATURED_SERVICES_LIMIT,
  SERVICES,
  ServiceItem
} from '../../content/site-content';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { PrimaryCtaComponent } from '../cta-buttons/primary-cta.component';

@Component({
  selector: 'app-services-grid-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SectionHeadingComponent,
    RevealOnScrollDirective,
    PrimaryCtaComponent
  ],
  templateUrl: './services-grid-section.component.html',
  styleUrl: './services-grid-section.component.scss'
})
export class ServicesGridSectionComponent {
  readonly featuredServices = SERVICES.slice(0, HOME_FEATURED_SERVICES_LIMIT);
  readonly remainingServicesCount = Math.max(0, SERVICES.length - this.featuredServices.length);

  routePath(service: ServiceItem): string {
    return service.route.split('#')[0] || '/services';
  }

  routeFragment(service: ServiceItem): string | undefined {
    return service.route.includes('#') ? service.route.split('#')[1] : undefined;
  }
}
