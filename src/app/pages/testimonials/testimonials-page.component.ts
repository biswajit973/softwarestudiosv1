import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { PrimaryCtaComponent } from '../../components/cta-buttons/primary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { TESTIMONIALS, TestimonialItem } from '../../content/site-content';
import { VideoEngineComponent, VideoCard } from '../../components/video-engine/video-engine.component';

@Component({
    selector: 'app-testimonials-page',
    standalone: true,
    imports: [
        CommonModule,
        SectionHeadingComponent,
        PrimaryCtaComponent,
        RevealOnScrollDirective,
        VideoEngineComponent
    ],
    templateUrl: './testimonials-page.component.html',
    styleUrl: './testimonials-page.component.scss'
})
export class TestimonialsPageComponent {
    readonly allTestimonials: TestimonialItem[] = TESTIMONIALS;
    readonly featuredTestimonial: TestimonialItem | undefined =
        TESTIMONIALS.find(t => t.featured);
    readonly gridTestimonials: TestimonialItem[] =
        TESTIMONIALS.filter(t => !t.featured);

    /** Split into two rows for dual-direction marquee */
    readonly row1: TestimonialItem[] = this.gridTestimonials.filter((_, i) => i % 2 === 0);
    readonly row2: TestimonialItem[] = this.gridTestimonials.filter((_, i) => i % 2 !== 0);

    readonly stars = [1, 2, 3, 4, 5];

    readonly platformBadges = [
        { name: 'Google', icon: '⭐' },
        { name: 'Clutch', icon: '🏆' },
        { name: 'Trustpilot', icon: '✦' },
        { name: 'GoodFirms', icon: '✔' }
    ];

    readonly videoReels: VideoCard[] = [
        {
            src: 'assets/videos/1.mp4',
            title: 'Client Success Story',
            subtitle: 'Website launch — 3x more calls'
        },
        {
            src: 'assets/videos/2.mp4',
            title: 'App Development',
            subtitle: 'Custom app for daily operations'
        },
        {
            src: 'assets/videos/3.mp4',
            title: 'Digital Marketing',
            subtitle: 'SEO results in 60 days'
        },
        {
            src: 'assets/videos/4.mp4',
            title: 'E-Commerce Store',
            subtitle: 'Online orders from day one'
        },
        {
            src: 'assets/videos/5.mp4',
            title: 'Brand Identity',
            subtitle: 'Full rebrand and social setup'
        }
    ];
}
