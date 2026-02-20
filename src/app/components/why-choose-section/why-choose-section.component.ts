import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface DifferenceCard {
  icon: string;
  title: string;
  copy: string;
}

@Component({
  selector: 'app-why-choose-section',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, RevealOnScrollDirective],
  templateUrl: './why-choose-section.component.html',
  styleUrl: './why-choose-section.component.scss'
})
export class WhyChooseSectionComponent {
  readonly cards: DifferenceCard[] = [
    {
      icon: '💰',
      title: 'Affordable, Always',
      copy: 'Starting at just ₹24,999. Quality work that fits your budget and gives real business value.'
    },
    {
      icon: '🇮🇳',
      title: 'Built for India',
      copy: 'We understand Indian customers, local search behavior, and practical business needs.'
    },
    {
      icon: '🏗️',
      title: '12 Years of Doing This',
      copy: 'Since 2014, we have solved similar business challenges across industries with proven workflows.'
    },
    {
      icon: '🌐',
      title: 'Local to Global',
      copy: 'We help you grow from local visibility to city-level trust and wider market reach.'
    },
    {
      icon: '🤝',
      title: 'End-to-End Partnership',
      copy: 'We stay with you after launch through support, maintenance, and growth optimization.'
    }
  ];
}
