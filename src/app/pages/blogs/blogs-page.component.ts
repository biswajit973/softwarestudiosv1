import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CONTACT_INFO } from '../../content/site-content';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { BlogTopic } from './blog.model';
import { SOFTWARE_STUDIOS_BLOGS } from './blog-data';

@Component({
  selector: 'app-blogs-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss'
})
export class BlogsPageComponent {
  readonly topics = SOFTWARE_STUDIOS_BLOGS;
  readonly contact = CONTACT_INFO;
  readonly featuredSlug = 'ai-bubble-vs-dotcom';

  constructor(private readonly router: Router) {}

  get featuredTopic(): BlogTopic {
    return this.topics.find((topic) => topic.slug === this.featuredSlug) ?? this.topics[0];
  }

  get otherTopics(): BlogTopic[] {
    return this.topics.filter((topic) => topic.slug !== this.featuredTopic.slug);
  }

  get whatsappHref(): string {
    const text = encodeURIComponent('Hello Software Studios, I want guidance for digital strategy and AI adoption.');
    return `https://wa.me/${this.contact.whatsappPhone}?text=${text}`;
  }

  trackTopic(_index: number, topic: BlogTopic): string {
    return topic.slug;
  }

  openTopic(slug: string): void {
    this.router.navigate(['/blogs', slug]);
  }
}
