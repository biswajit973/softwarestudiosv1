import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PrimaryCtaComponent } from '../../components/cta-buttons/primary-cta.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

export interface WorkItem {
    name: string;
    domain: string;
    url: string;
    category: string;
    description: string;
}

@Component({
    selector: 'app-works-page',
    standalone: true,
    imports: [CommonModule, PrimaryCtaComponent, RevealOnScrollDirective],
    templateUrl: './works-page.component.html',
    styleUrl: './works-page.component.scss'
})
export class WorksPageComponent {
    readonly works: WorkItem[] = [
        {
            name: 'Vivid LED Solutions',
            domain: 'vividledsolutions.in',
            url: 'https://vividledsolutions.in/',
            category: 'LED & Lighting',
            description: 'Full website for an LED solutions company with product catalog and inquiry system.'
        },
        {
            name: 'Frutbar',
            domain: 'frutbar.com',
            url: 'http://www.frutbar.com/',
            category: 'Food & Beverage',
            description: 'Brand website for a fruit-based snack company with vibrant product presentation.'
        },
        {
            name: 'Oye Gifts',
            domain: 'oyegifts.com',
            url: 'https://www.oyegifts.com/',
            category: 'E-Commerce',
            description: 'Online gifting platform with extensive catalog, checkout, and delivery tracking.'
        },
        {
            name: 'FLOS',
            domain: 'flos.com',
            url: 'https://flos.com/en/it/',
            category: 'Premium Lighting',
            description: 'Italian luxury lighting brand with premium product showcase and global presence.'
        },
        {
            name: 'CI Design',
            domain: 'ci.design',
            url: 'https://ci.design/',
            category: 'Architecture & Design',
            description: 'Modern architecture studio website with portfolio gallery and project showcases.'
        },
        {
            name: 'Studia 54',
            domain: 'studia-54.com',
            url: 'https://studia-54.com/en/portfolioitems/expressive-interior-apartment-saudi-arabia',
            category: 'Interior Design',
            description: 'High-end interior design studio with immersive project presentations.'
        },
        {
            name: 'Proven Robotics',
            domain: 'provenrobotics.ai',
            url: 'https://provenrobotics.ai/',
            category: 'AI & Robotics',
            description: 'AI and robotics solutions provider with product demos and enterprise features.'
        },
        {
            name: 'KFSHRC',
            domain: 'kfshrc.edu.sa',
            url: 'https://www.kfshrc.edu.sa',
            category: 'Healthcare',
            description: 'King Faisal Specialist Hospital — digital presence for a leading medical institution.'
        },
        {
            name: 'X Hair Lounge',
            domain: 'xhairlounge.com',
            url: 'https://xhairlounge.com/',
            category: 'Beauty & Salon',
            description: 'Premium salon website with booking system, gallery, and service showcase.'
        },
        {
            name: 'Chaps & Co',
            domain: 'chapsandco.com',
            url: 'https://www.chapsandco.com/ae/',
            category: 'Grooming',
            description: 'Luxury men\'s grooming brand with locations, booking, and brand storytelling.'
        },
        {
            name: 'MUA Crystal Salon',
            domain: 'muacrystalsalon.com',
            url: 'https://muacrystalsalon.com/',
            category: 'Beauty & Salon',
            description: 'Premium beauty salon with service listings, gallery, and online booking.'
        },
        {
            name: 'Burjeel',
            domain: 'burjeel.com',
            url: 'https://burjeel.com/',
            category: 'Healthcare',
            description: 'Leading hospital group website with doctor profiles, departments, and patient portal.'
        },
        {
            name: 'Smith Clark Cast Iron',
            domain: 'smithclarkcastiron.com',
            url: 'https://smithclarkcastiron.com/',
            category: 'Manufacturing',
            description: 'Cast iron manufacturer with product catalog, quality certifications, and B2B inquiries.'
        }
    ];

    activeFilter = 'All';

    get categories(): string[] {
        const uniqueCategories = [...new Set(this.works.map(w => w.category))];
        return ['All', ...uniqueCategories];
    }

    get filteredWorks(): WorkItem[] {
        if (this.activeFilter === 'All') {
            return this.works;
        }
        return this.works.filter(w => w.category === this.activeFilter);
    }

    setFilter(category: string): void {
        this.activeFilter = category;
    }

    faviconUrl(domain: string): string {
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
}
