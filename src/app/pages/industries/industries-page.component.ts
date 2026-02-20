import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INDUSTRIES } from '../../content/site-content';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { PrimaryCtaComponent } from '../../components/cta-buttons/primary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-industries-page',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, PrimaryCtaComponent, RevealOnScrollDirective],
  templateUrl: './industries-page.component.html',
  styleUrl: './industries-page.component.scss'
})
export class IndustriesPageComponent {
  readonly industries = INDUSTRIES;
}
