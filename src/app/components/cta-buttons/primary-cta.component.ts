import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-cta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './primary-cta.component.html',
  styleUrl: './primary-cta.component.scss'
})
export class PrimaryCtaComponent {
  @Input({ required: true }) label = '';
  @Input() href: string | null = null;
  @Input() routerLink: string | null = null;
  @Input() target = '_self';
  @Input() ariaLabel: string | null = null;
  @Input() tone: 'default' | 'navbar' = 'default';
}
