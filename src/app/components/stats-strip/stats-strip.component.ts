import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BRAND_STATS } from '../../content/site-content';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-stats-strip',
  standalone: true,
  imports: [CommonModule, CountUpDirective, RevealOnScrollDirective],
  templateUrl: './stats-strip.component.html',
  styleUrl: './stats-strip.component.scss'
})
export class StatsStripComponent {
  readonly stats = BRAND_STATS;
}
