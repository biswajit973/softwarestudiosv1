import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PROCESS_STEPS } from '../../content/site-content';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-process-timeline-section',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './process-timeline-section.component.html',
  styleUrl: './process-timeline-section.component.scss'
})
export class ProcessTimelineSectionComponent {
  readonly steps = PROCESS_STEPS;

  bentoClass(index: number): string {
    switch (index) {
      case 0:
        return 'process__step--primary';
      case 1:
        return 'process__step--wide';
      case 2:
        return 'process__step--tall';
      case 3:
        return 'process__step--compact';
      default:
        return 'process__step--full';
    }
  }
}
