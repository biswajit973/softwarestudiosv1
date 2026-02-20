import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss'
})
export class SectionHeadingComponent {
  @Input() overline = '';
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() center = true;
}
