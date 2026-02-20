import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secondary-cta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './secondary-cta.component.html',
  styleUrl: './secondary-cta.component.scss'
})
export class SecondaryCtaComponent {
  @Input({ required: true }) label = '';
  @Input() href: string | null = null;
  @Input() routerLink: string | null = null;
  @Input() target = '_self';
  @Input() ariaLabel: string | null = null;
}
