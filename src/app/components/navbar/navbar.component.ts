import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { PrimaryCtaComponent } from '../cta-buttons/primary-cta.component';
import { SoftwareStudiosLogoComponent } from '../logo/software-studios-logo.component';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SoftwareStudiosLogoComponent,
    PrimaryCtaComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Services', route: '/services' },
    { label: 'Industries', route: '/industries' },
    { label: 'Blogs', route: '/blogs' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  isScrolled = false;
  isMenuOpen = false;

  private routeSub: Subscription | null = null;
  private readonly isBrowser: boolean;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 8;
    }

    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setMenuOpen(false);
      });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    if (this.isBrowser) {
      document.body.classList.remove('mobile-menu-open');
    }
  }

  toggleMenu(): void {
    this.setMenuOpen(!this.isMenuOpen);
  }

  closeMenu(): void {
    this.setMenuOpen(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) {
      return;
    }

    this.isScrolled = window.scrollY > 8;
  }

  private setMenuOpen(open: boolean): void {
    this.isMenuOpen = open;
    if (!this.isBrowser) {
      return;
    }
    document.body.classList.toggle('mobile-menu-open', this.isMenuOpen);
  }
}
