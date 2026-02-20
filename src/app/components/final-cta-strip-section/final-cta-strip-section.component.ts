import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../content/site-content';
import { PrimaryCtaComponent } from '../cta-buttons/primary-cta.component';
import { SecondaryCtaComponent } from '../cta-buttons/secondary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-final-cta-strip-section',
  standalone: true,
  imports: [PrimaryCtaComponent, SecondaryCtaComponent, RevealOnScrollDirective],
  templateUrl: './final-cta-strip-section.component.html',
  styleUrl: './final-cta-strip-section.component.scss'
})
export class FinalCtaStripSectionComponent {
  readonly contact = CONTACT_INFO;
}
