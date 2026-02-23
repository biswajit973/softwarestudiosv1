import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

export interface PortfolioItem {
    name: string;
    domain: string;
    url: string;
}

@Component({
    selector: 'app-portfolio-section',
    standalone: true,
    imports: [CommonModule, SectionHeadingComponent, RevealOnScrollDirective],
    templateUrl: './portfolio-section.component.html',
    styleUrl: './portfolio-section.component.scss'
})
export class PortfolioSectionComponent {
    readonly portfolioItems: PortfolioItem[] = [
        { name: 'Vivid LED Solutions', domain: 'vividledsolutions.in', url: 'https://vividledsolutions.in/' },
        { name: 'Frutbar', domain: 'frutbar.com', url: 'http://www.frutbar.com/' },
        { name: 'Oye Gifts', domain: 'oyegifts.com', url: 'https://www.oyegifts.com/' },
        { name: 'FLOS', domain: 'flos.com', url: 'https://flos.com/en/it/' },
        { name: 'CI Design', domain: 'ci.design', url: 'https://ci.design/' },
        { name: 'Studia 54', domain: 'studia-54.com', url: 'https://studia-54.com/en/portfolioitems/expressive-interior-apartment-saudi-arabia' },
        { name: 'Proven Robotics', domain: 'provenrobotics.ai', url: 'https://provenrobotics.ai/' },
        { name: 'KFSHRC', domain: 'kfshrc.edu.sa', url: 'https://www.kfshrc.edu.sa' },
        { name: 'X Hair Lounge', domain: 'xhairlounge.com', url: 'https://xhairlounge.com/' },
        { name: 'Chaps & Co', domain: 'chapsandco.com', url: 'https://www.chapsandco.com/ae/' },
        { name: 'MUA Crystal Salon', domain: 'muacrystalsalon.com', url: 'https://muacrystalsalon.com/' },
        { name: 'Burjeel', domain: 'burjeel.com', url: 'https://burjeel.com/' },
        { name: 'Smith Clark Cast Iron', domain: 'smithclarkcastiron.com', url: 'https://smithclarkcastiron.com/' }
    ];

    faviconUrl(domain: string): string {
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
}
