import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface TeaserMilestone {
  year: string;
  text: string;
}

@Component({
  selector: 'app-about-teaser-section',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, RevealOnScrollDirective],
  templateUrl: './about-teaser-section.component.html',
  styleUrl: './about-teaser-section.component.scss'
})
export class AboutTeaserSectionComponent {
  readonly milestones: TeaserMilestone[] = [
    { year: '2014', text: 'Our mission started: make digital growth affordable for Indian businesses.' },
    { year: '2018', text: 'Expanded from websites to apps and custom business platforms.' },
    { year: '2022', text: 'Added AI, chatbot, and automation services for faster operations.' },
    { year: '2026', text: '12 years strong with one promise: every business should be found online.' }
  ];
}
