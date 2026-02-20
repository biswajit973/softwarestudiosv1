import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { animation: 'home' },
    loadComponent: () => import('./pages/home/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'services',
    data: { animation: 'services' },
    loadComponent: () => import('./pages/services/services-page.component').then((m) => m.ServicesPageComponent)
  },
  {
    path: 'industries',
    data: { animation: 'industries' },
    loadComponent: () => import('./pages/industries/industries-page.component').then((m) => m.IndustriesPageComponent)
  },
  {
    path: 'about',
    data: { animation: 'about' },
    loadComponent: () => import('./pages/about/about-page.component').then((m) => m.AboutPageComponent)
  },
  {
    path: 'contact',
    data: { animation: 'contact' },
    loadComponent: () => import('./pages/contact/contact-page.component').then((m) => m.ContactPageComponent)
  },
  {
    path: 'blogs',
    data: { animation: 'blogs' },
    loadComponent: () => import('./pages/blogs/blogs-page.component').then((m) => m.BlogsPageComponent)
  },
  {
    path: 'blogs/:slug',
    data: { animation: 'blog' },
    loadComponent: () => import('./pages/blog/blog-page.component').then((m) => m.BlogPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
