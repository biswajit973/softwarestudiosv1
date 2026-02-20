import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_INFO } from '../../content/site-content';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

type HeroScannerBadgeTone = 'teal' | 'mint' | 'gold' | 'slate';
type HeroScannerCardKind = 'bars' | 'shield' | 'progress' | 'ring' | 'alert';

interface HeroScannerCard {
  id: string;
  title: string;
  badge: string;
  badgeTone: HeroScannerBadgeTone;
  kind: HeroScannerCardKind;
  metric: string;
  subline: string;
  progress?: number;
  bars?: number[];
}

interface HeroScannerRenderCard extends HeroScannerCard {
  instanceId: string;
  insightTitle: string;
  insightPoints: string[];
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  readonly contact = CONTACT_INFO;
  readonly heroTypingPrefix = 'Outcome:';
  readonly heroTypingPhrases = [
    'Get found by real customers near you.',
    'Turn visitors into calls, leads, and bookings.',
    'Scale with practical tech and clear pricing.'
  ];
  heroTypingDisplay = '';

  readonly scannerCards: HeroScannerCard[] = [
    {
      id: 'web-presence',
      title: 'Website and Web Apps',
      badge: 'Lead Ready',
      badgeTone: 'teal',
      kind: 'bars',
      metric: 'Fast, scalable, conversion-first',
      subline: 'Get found on search and convert visitors into inquiries.',
      bars: [35, 48, 44, 65, 60, 82, 73, 92]
    },
    {
      id: 'ai-stack',
      title: 'AI and Automation',
      badge: 'Future Ready',
      badgeTone: 'mint',
      kind: 'progress',
      metric: 'Chatbots, agents, workflows',
      subline: 'Save team time and reply faster to every customer.',
      progress: 84
    },
    {
      id: 'design-content',
      title: 'Creative and Content',
      badge: 'Brand Focus',
      badgeTone: 'gold',
      kind: 'shield',
      metric: 'Design + content consistency',
      subline: 'Build trust with strong visuals and clear messaging.'
    },
    {
      id: 'growth-marketing',
      title: 'Growth Marketing',
      badge: 'SEO + Ads',
      badgeTone: 'slate',
      kind: 'ring',
      metric: 'Discoverability and demand',
      subline: 'Bring quality leads through SEO, social, and ads.',
      progress: 91
    },
    {
      id: 'support-scale',
      title: 'Cloud and Support',
      badge: 'Operational',
      badgeTone: 'teal',
      kind: 'alert',
      metric: 'Deploy, monitor, improve',
      subline: 'Launch reliably and improve continuously after go-live.'
    }
  ];

  readonly scannerRenderCards: HeroScannerRenderCard[] = this.buildRenderCards();

  private typingTimeoutId: number | null = null;
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private readonly typingSpeedMs = 44;
  private readonly deletingSpeedMs = 28;
  private readonly holdAfterTypeMs = 1400;
  private readonly holdAfterDeleteMs = 240;

  ngAfterViewInit(): void {
    this.startTypingLoop();
  }

  ngOnDestroy(): void {
    if (this.typingTimeoutId !== null) {
      window.clearTimeout(this.typingTimeoutId);
      this.typingTimeoutId = null;
    }
  }

  get whatsappHref(): string {
    const msg = encodeURIComponent(
      'Hello Software Studios, I want to start my digital journey. Please guide me with a free consultation.'
    );
    return `https://wa.me/${this.contact.whatsappPhone}?text=${msg}`;
  }

  trackScannerCard(_index: number, card: HeroScannerRenderCard): string {
    return card.instanceId;
  }

  badgeClass(tone: HeroScannerBadgeTone): string {
    return `hero-scan-badge--${tone}`;
  }

  private startTypingLoop(): void {
    const phrase = this.heroTypingPhrases[this.phraseIndex] ?? '';

    if (!this.isDeleting) {
      this.charIndex += 1;
      this.heroTypingDisplay = phrase.slice(0, this.charIndex);
      if (this.charIndex >= phrase.length) {
        this.scheduleNext(this.holdAfterTypeMs, () => {
          this.isDeleting = true;
          this.startTypingLoop();
        });
        return;
      }
      this.scheduleNext(this.typingSpeedMs, () => this.startTypingLoop());
      return;
    }

    this.charIndex -= 1;
    this.heroTypingDisplay = phrase.slice(0, Math.max(0, this.charIndex));
    if (this.charIndex <= 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.heroTypingPhrases.length;
      this.scheduleNext(this.holdAfterDeleteMs, () => this.startTypingLoop());
      return;
    }

    this.scheduleNext(this.deletingSpeedMs, () => this.startTypingLoop());
  }

  private scheduleNext(delayMs: number, fn: () => void): void {
    if (this.typingTimeoutId !== null) {
      window.clearTimeout(this.typingTimeoutId);
    }
    this.typingTimeoutId = window.setTimeout(fn, delayMs);
  }

  private buildRenderCards(): HeroScannerRenderCard[] {
    const cards: HeroScannerRenderCard[] = [];
    for (let i = 0; i < 2; i += 1) {
      for (const card of this.scannerCards) {
        cards.push({
          ...card,
          instanceId: `${card.id}-${i}`,
          insightTitle: this.buildInsightTitle(card),
          insightPoints: this.buildInsightPoints(card)
        });
      }
    }
    return cards;
  }

  private buildInsightTitle(card: HeroScannerCard): string {
    switch (card.id) {
      case 'web-presence':
        return 'Digital visibility';
      case 'ai-stack':
        return 'Smart automation';
      case 'design-content':
        return 'Brand consistency';
      case 'growth-marketing':
        return 'Demand generation';
      case 'support-scale':
        return 'Scale and reliability';
      default:
        return 'Business growth';
    }
  }

  private buildInsightPoints(card: HeroScannerCard): string[] {
    switch (card.id) {
      case 'web-presence':
        return [
          'Website experience tuned for conversion.',
          'Search-friendly structure and speed.',
          'Clear customer journey from visit to inquiry.'
        ];
      case 'ai-stack':
        return [
          'Chatbots for support and lead capture.',
          'Automated workflows for faster operations.',
          'Human-in-loop design for critical decisions.'
        ];
      case 'design-content':
        return [
          'Creative assets for web and campaigns.',
          'Professional content for trust building.',
          'Uniform tone across customer touchpoints.'
        ];
      case 'growth-marketing':
        return [
          'SEO and paid campaigns with tracking.',
          'Better reach to high-intent users.',
          'Continuous iteration for better ROI.'
        ];
      case 'support-scale':
        return [
          'Deployment and cloud support.',
          'Monitoring and uptime confidence.',
          'Long-term partnership after launch.'
        ];
      default:
        return ['Practical planning.', 'Transparent execution.', 'Measured improvement.'];
    }
  }
}
