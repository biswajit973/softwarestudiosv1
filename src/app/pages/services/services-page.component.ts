import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SERVICES, CONTACT_INFO, PRICING_HIGHLIGHT } from '../../content/site-content';
import { PrimaryCtaComponent } from '../../components/cta-buttons/primary-cta.component';
import { SecondaryCtaComponent } from '../../components/cta-buttons/secondary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryCtaComponent,
    SecondaryCtaComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent {
  readonly services = SERVICES;
  readonly pricing = PRICING_HIGHLIGHT;
  readonly contact = CONTACT_INFO;

  get whatsappHref(): string {
    const msg = encodeURIComponent('Hello Software Studios, I want service details and a custom quote.');
    return `https://wa.me/${this.contact.whatsappPhone}?text=${msg}`;
  }
}
