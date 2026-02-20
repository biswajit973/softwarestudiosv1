import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { trigger, transition, style, query, animate } from '@angular/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatbotWidgetComponent } from './components/chatbot-widget/chatbot-widget.component';
import { ContactFabComponent } from './components/contact-fab/contact-fab.component';
import { BrandLabOverlayComponent } from './components/brand-lab-overlay/brand-lab-overlay.component';
import { ROUTE_SEO } from './content/site-content';
import { SeoMetaService } from './core/services/seo-meta.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ChatbotWidgetComponent,
    ContactFabComponent,
    BrandLabOverlayComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        query(':enter', [style({ opacity: 0, transform: 'translateY(10px)' })], {
          optional: true
        }),
        query(':leave', [animate('180ms ease', style({ opacity: 0 }))], {
          optional: true
        }),
        query(':enter', [animate('260ms ease', style({ opacity: 1, transform: 'translateY(0)' }))], {
          optional: true
        })
      ])
    ])
  ]
})
export class App implements OnInit, OnDestroy {
  readonly showBrandLab = environment.uiMode === 'preview';
  private routeSub: Subscription | null = null;

  constructor(
    private readonly router: Router,
    private readonly seoMetaService: SeoMetaService
  ) {}

  ngOnInit(): void {
    this.updateMeta(this.router.url);

    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateMeta(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet.activatedRouteData?.['animation'] ?? 'default';
  }

  private updateMeta(url: string): void {
    const cleanPath = url.split('?')[0].split('#')[0] || '/';
    const resolvedPath = cleanPath.startsWith('/blogs/') ? '/blogs' : cleanPath;
    const meta = ROUTE_SEO[resolvedPath] ?? ROUTE_SEO['/'];
    this.seoMetaService.update(meta, cleanPath);

    if (cleanPath === '/') {
      this.seoMetaService.setHomeStructuredData();
    }
  }
}
