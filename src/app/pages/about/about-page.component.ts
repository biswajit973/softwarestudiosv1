import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { PrimaryCtaComponent } from '../../components/cta-buttons/primary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface AboutMilestone {
  period: string;
  title: string;
  summary: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, PrimaryCtaComponent, RevealOnScrollDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  readonly milestones: AboutMilestone[] = [
    {
      period: '2014-2016',
      title: 'Digital foundation years',
      summary:
        'We started when many businesses were still offline. We helped them take their first digital step with practical websites and clear positioning.'
    },
    {
      period: '2017-2020',
      title: 'Scalable delivery and stronger systems',
      summary:
        'As cloud and modern frameworks evolved, we improved delivery speed, reliability, and support for growing business operations.'
    },
    {
      period: '2021-2023',
      title: 'Quality, performance, and security maturity',
      summary:
        'We strengthened quality through better testing, cleaner deployment flow, and secure engineering practices.'
    },
    {
      period: '2024-2026',
      title: 'AI-led growth enablement',
      summary:
        'Today we help businesses adopt AI, automation, and smarter workflows in practical ways that save time and improve growth.'
    }
  ];
}
