import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../content/site-content';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SoftwareStudiosLogoComponent } from '../logo/software-studios-logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, SoftwareStudiosLogoComponent, RevealOnScrollDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly contact = CONTACT_INFO;
  readonly socialLinks = SOCIAL_LINKS;
  readonly coreLinks = [
    { label: 'Home', route: '/' },
    { label: 'Services', route: '/services' },
    { label: 'Industries', route: '/industries' },
    { label: 'Blogs', route: '/blogs' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  get phoneDisplay(): string {
    return '+91 63709 31250';
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  socialLabel(platform: string): string {
    return `${platform}`;
  }
}
