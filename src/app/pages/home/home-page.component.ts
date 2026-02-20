import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { StatsStripComponent } from '../../components/stats-strip/stats-strip.component';
import { AboutTeaserSectionComponent } from '../../components/about-teaser-section/about-teaser-section.component';
import { WhyChooseSectionComponent } from '../../components/why-choose-section/why-choose-section.component';
import { ServicesGridSectionComponent } from '../../components/services-grid-section/services-grid-section.component';
import { IndustriesGridSectionComponent } from '../../components/industries-grid-section/industries-grid-section.component';
import { ProcessTimelineSectionComponent } from '../../components/process-timeline-section/process-timeline-section.component';
import { TestimonialsCarouselSectionComponent } from '../../components/testimonials-carousel-section/testimonials-carousel-section.component';
import { InsightStripSectionComponent } from '../../components/insight-strip-section/insight-strip-section.component';
import { PricingHighlightSectionComponent } from '../../components/pricing-highlight-section/pricing-highlight-section.component';
import { FinalCtaStripSectionComponent } from '../../components/final-cta-strip-section/final-cta-strip-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    StatsStripComponent,
    AboutTeaserSectionComponent,
    WhyChooseSectionComponent,
    ServicesGridSectionComponent,
    IndustriesGridSectionComponent,
    ProcessTimelineSectionComponent,
    TestimonialsCarouselSectionComponent,
    InsightStripSectionComponent,
    PricingHighlightSectionComponent,
    FinalCtaStripSectionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {}
