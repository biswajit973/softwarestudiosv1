import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONTACT_INFO } from '../../content/site-content';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SecondaryCtaComponent } from '../../components/cta-buttons/secondary-cta.component';

type PreferredChannel = 'call' | 'whatsapp' | 'email';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeadingComponent, RevealOnScrollDirective, SecondaryCtaComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  readonly contact = CONTACT_INFO;

  form = {
    name: '',
    business: '',
    need: '',
    phone: '',
    email: '',
    channel: 'whatsapp' as PreferredChannel
  };

  submitted = false;
  showValidation = false;

  get isValid(): boolean {
    return Boolean(this.form.name.trim() && this.form.business.trim() && this.form.need.trim());
  }

  get handoffMessage(): string {
    return [
      `Name: ${this.form.name || 'Not provided'}`,
      `Business: ${this.form.business || 'Not provided'}`,
      `Need: ${this.form.need || 'Not provided'}`,
      `Phone: ${this.form.phone || 'Not provided'}`,
      `Email: ${this.form.email || 'Not provided'}`
    ].join('\n');
  }

  get whatsappHref(): string {
    return `https://wa.me/${this.contact.whatsappPhone}?text=${encodeURIComponent(this.handoffMessage)}`;
  }

  get mailtoHref(): string {
    const subject = encodeURIComponent('Free Consultation Request - Software Studios');
    const body = encodeURIComponent(this.handoffMessage);
    return `mailto:${this.contact.email}?subject=${subject}&body=${body}`;
  }

  submit(): void {
    this.showValidation = true;

    if (!this.isValid) {
      this.submitted = false;
      return;
    }

    this.submitted = true;
  }

  reset(): void {
    this.form = {
      name: '',
      business: '',
      need: '',
      phone: '',
      email: '',
      channel: 'whatsapp'
    };
    this.submitted = false;
    this.showValidation = false;
  }
}
