import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONTACT_INFO } from '../../content/site-content';

interface ChatLink {
  label: string;
  href: string;
  target?: '_blank';
}

interface ChatReply {
  lines: string[];
  bullets?: string[];
  links?: ChatLink[];
}

interface ChatMessage extends ChatReply {
  id: string;
  sender: 'bot' | 'user';
  time: string;
  typing?: boolean;
}

interface KnowledgeItem {
  keywords: string[];
  answer: ChatReply;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.scss'
})
export class ChatbotWidgetComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('messagesBox') private messagesBox?: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl') private inputEl?: ElementRef<HTMLInputElement>;

  readonly contact = CONTACT_INFO;

  isOpen = false;
  initialized = false;
  inputText = '';
  suggestionsOpen = true;
  messages: ChatMessage[] = [];

  private audioCtx: AudioContext | null = null;
  private readonly timers: number[] = [];
  private msgCounter = 0;

  readonly quickQuestions = [
    'What services do you offer?',
    'How can you help my business go digital?',
    'Do you build AI chatbots and automation?',
    'Which industries do you support?',
    'How can I get a free consultation?',
    'Tell me about Software Studios.'
  ];

  private readonly knowledgeBase: KnowledgeItem[] = [
    {
      keywords: ['services', 'offer', 'build', 'provide'],
      answer: {
        lines: ['We provide practical digital solutions for business growth.'],
        bullets: [
          'Website and web application development',
          'Android and iOS app development',
          'Digital marketing and lead generation',
          'Graphics design and content creation',
          'AI avatars, chatbots, and automation systems'
        ]
      }
    },
    {
      keywords: ['digital', 'go online', 'online presence', 'business go digital'],
      answer: {
        lines: [
          'We help you go digital step-by-step so customers can find and trust you.',
          'First we understand your goal, then we build a simple roadmap with clear pricing.'
        ]
      }
    },
    {
      keywords: ['ai', 'automation', 'agent', 'ml'],
      answer: {
        lines: ['Yes. We build AI chatbots, AI agents, and workflow automation for business teams.'],
        bullets: [
          'Customer support automation',
          'Lead capture and qualification',
          'Content and reporting automation',
          'Human approval in critical decision flows'
        ]
      }
    },
    {
      keywords: ['industry', 'industries', 'sector', 'domain'],
      answer: {
        lines: ['We support multiple industries across India.'],
        bullets: [
          'Healthcare and clinics',
          'Legal and professional services',
          'Education and institutions',
          'Hospitality, retail, and e-commerce',
          'Manufacturing and real estate'
        ]
      }
    },
    {
      keywords: ['contact', 'advisor', 'call', 'phone', 'email', 'whatsapp', 'consultation'],
      answer: {
        lines: ['You can connect with our advisor using any channel below.'],
        links: [
          { label: 'Call: +91 63709 31250', href: 'tel:+916370931250' },
          { label: 'Email: hello@softwarestudios.in', href: 'mailto:hello@softwarestudios.in' },
          {
            label: 'WhatsApp us',
            href: `https://wa.me/${CONTACT_INFO.whatsappPhone}`,
            target: '_blank'
          }
        ]
      }
    },
    {
      keywords: ['about', 'software studios', 'who are you', 'company'],
      answer: {
        lines: [
          'Software Studios is Kkreative’s technology wing, operating since 2014.',
          'Our focus is affordable and practical digital growth for Indian businesses.'
        ]
      }
    },
    {
      keywords: ['price', 'pricing', 'cost', 'budget'],
      answer: {
        lines: ['Our projects start from ₹24,999 based on scope and business goals.'],
        bullets: [
          'No hidden charges',
          'Clear deliverables and timeline',
          'Support after launch'
        ]
      }
    },
    {
      keywords: ['blog', 'insight', 'article', 'read'],
      answer: {
        lines: ['You can read practical business-tech insights on our Blogs page.'],
        links: [{ label: 'Open Blogs', href: '/blogs' }]
      }
    }
  ];

  trackMessage(_index: number, message: ChatMessage): string {
    return message.id;
  }

  trackQuick(_index: number, item: string): string {
    return item;
  }

  trackLink(_index: number, link: ChatLink): string {
    return `${link.label}-${link.href}`;
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      return;
    }

    this.suggestionsOpen = true;

    if (!this.initialized) {
      this.initialized = true;
      this.schedule(() => {
        this.addBotMessage(
          {
            lines: [
              'Hello! Welcome to Software Studios.',
              'We help Indian businesses grow with practical and affordable digital solutions.'
            ]
          },
          true
        );
        this.schedule(() => {
          this.addBotMessage({
            lines: ['Ask me about services, pricing, industries, AI automation, or consultation.']
          });
        }, 900);
      }, 250);
    }

    this.schedule(() => this.inputEl?.nativeElement.focus(), 50);
  }

  onSend(): void {
    const text = this.inputText.trim();
    if (!text) {
      return;
    }

    this.playClickSound();
    this.inputText = '';
    this.addUserMessage(text);
    const answer = this.findAnswer(text);
    this.addBotMessage(answer);
  }

  onQuickAsk(question: string): void {
    this.playClickSound();
    this.addUserMessage(question);
    const answer = this.findAnswer(question);
    this.addBotMessage(answer);
  }

  toggleSuggestions(): void {
    this.suggestionsOpen = !this.suggestionsOpen;
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  private findAnswer(query: string): ChatReply {
    const q = query.toLowerCase().trim();

    let best: KnowledgeItem | null = null;
    let bestScore = 0;

    for (const item of this.knowledgeBase) {
      let score = 0;
      for (const kw of item.keywords) {
        if (q.includes(kw.toLowerCase())) {
          score += kw.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }

    if (best && bestScore > 0) {
      return best.answer;
    }

    return {
      lines: [
        'I can help with services, pricing, industries, and consultation options.',
        'Choose one of the suggestions or contact us directly.'
      ],
      links: [
        { label: 'Call: +91 63709 31250', href: 'tel:+916370931250' },
        { label: 'Email: hello@softwarestudios.in', href: 'mailto:hello@softwarestudios.in' }
      ]
    };
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      id: this.nextId(),
      sender: 'user',
      lines: [text],
      time: this.getTimeText()
    });
    this.scrollMessages();
  }

  private addBotMessage(reply: ChatReply, skipSound = false): void {
    const typingId = this.nextId();
    this.messages.push({ id: typingId, sender: 'bot', lines: [], time: '', typing: true });
    this.scrollMessages();

    const replyLength = reply.lines.join(' ').length + (reply.bullets?.join(' ').length ?? 0);
    const delay = Math.min(850 + replyLength * 4, 1900);

    this.schedule(() => {
      this.messages = this.messages.filter((item) => item.id !== typingId);
      this.messages.push({
        id: this.nextId(),
        sender: 'bot',
        lines: reply.lines,
        bullets: reply.bullets,
        links: reply.links,
        time: this.getTimeText()
      });
      this.scrollMessages();
      if (!skipSound) {
        this.playNotifSound();
      }
    }, delay);
  }

  private getTimeText(): string {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0' : ''}${m} ${ampm}`;
  }

  private nextId(): string {
    this.msgCounter += 1;
    return `chat-${this.msgCounter}`;
  }

  private schedule(fn: () => void, ms: number): void {
    if (!this.isBrowser) {
      fn();
      return;
    }
    const id = window.setTimeout(fn, ms);
    this.timers.push(id);
  }

  private scrollMessages(): void {
    this.schedule(() => {
      const box = this.messagesBox?.nativeElement;
      if (!box) {
        return;
      }
      box.scrollTop = box.scrollHeight;
    }, 0);
  }

  private playNotifSound(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      if (!this.audioCtx) {
        const Ctx =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = Ctx ? new Ctx() : null;
      }
      if (!this.audioCtx) {
        return;
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(690, this.audioCtx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.24);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.24);
    } catch {
      // ignore audio errors
    }
  }

  private playClickSound(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      if (!this.audioCtx) {
        const Ctx =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = Ctx ? new Ctx() : null;
      }
      if (!this.audioCtx) {
        return;
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(560, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.035, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, this.audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch {
      // ignore audio errors
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.isOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.timers.forEach((id) => clearTimeout(id));
  }
}
