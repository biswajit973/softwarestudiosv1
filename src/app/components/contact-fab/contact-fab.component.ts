import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, PLATFORM_ID, inject } from '@angular/core';

interface ContactAction {
  id: 'call' | 'whatsapp' | 'mail';
  label: string;
  href: string;
  target?: '_blank';
}

@Component({
  selector: 'app-contact-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-fab.component.html',
  styleUrl: './contact-fab.component.scss'
})
export class ContactFabComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  isOpen = false;
  private audioCtx: AudioContext | null = null;

  readonly actions: ContactAction[] = [
    {
      id: 'call',
      label: 'Call',
      href: 'tel:+916370931250'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href:
        'https://wa.me/916370931250?text=Hello%20Software%20Studios%2C%20I%20need%20a%20free%20consultation.',
      target: '_blank'
    },
    {
      id: 'mail',
      label: 'Email',
      href:
        'mailto:info@softwarestudios.in?subject=Consultation%20Request%20-%20Software%20Studios'
    }
  ];

  onMainClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isOpen) {
      this.isOpen = false;
      return;
    }
    this.openWithSound();
  }

  onActionClick(): void {
    this.playTapSound();
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) {
      return;
    }
    const target = event.target as Node | null;
    if (target && !this.hostRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  private openWithSound(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    this.playPopSound();
  }

  private playPopSound(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      if (!this.audioCtx) {
        const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = Ctx ? new Ctx() : null;
      }
      if (!this.audioCtx) {
        return;
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.11);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.004, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // ignore audio failures
    }
  }

  private playTapSound(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      if (!this.audioCtx) {
        const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = Ctx ? new Ctx() : null;
      }
      if (!this.audioCtx) {
        return;
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.004, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore audio failures
    }
  }
}
