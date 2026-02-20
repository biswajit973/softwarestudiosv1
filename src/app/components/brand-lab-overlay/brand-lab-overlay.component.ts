import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandLabService } from '../../core/services/brand-lab.service';
import {
  DEFAULT_FONT_PRESET,
  DEFAULT_LOGO_VARIANT,
  FONT_PRESET_OPTIONS,
  FontPresetId,
  LOGO_VARIANT_OPTIONS,
  LogoVariantId
} from '../../shared/models/brand-lab.model';
import { SoftwareStudiosLogoComponent } from '../logo/software-studios-logo.component';

@Component({
  selector: 'app-brand-lab-overlay',
  standalone: true,
  imports: [CommonModule, SoftwareStudiosLogoComponent],
  templateUrl: './brand-lab-overlay.component.html',
  styleUrl: './brand-lab-overlay.component.scss'
})
export class BrandLabOverlayComponent implements OnInit, OnDestroy {
  readonly logoOptions = LOGO_VARIANT_OPTIONS;
  readonly fontOptions = FONT_PRESET_OPTIONS;

  isOpen = false;
  selectedLogo: LogoVariantId = DEFAULT_LOGO_VARIANT;
  selectedFont: FontPresetId = DEFAULT_FONT_PRESET;

  private readonly subscriptions = new Subscription();

  constructor(private readonly brandLabService: BrandLabService) {}

  ngOnInit(): void {
    this.selectedLogo = this.brandLabService.logoVariant;
    this.selectedFont = this.brandLabService.fontPreset;

    this.subscriptions.add(
      this.brandLabService.logoVariant$.subscribe((variant) => {
        this.selectedLogo = variant;
      })
    );

    this.subscriptions.add(
      this.brandLabService.fontPreset$.subscribe((preset) => {
        this.selectedFont = preset;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  selectLogo(variant: LogoVariantId): void {
    this.brandLabService.setLogoVariant(variant);
  }

  selectFont(preset: FontPresetId): void {
    this.brandLabService.setFontPreset(preset);
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }

  fontPreviewStack(id: FontPresetId): string {
    switch (id) {
      case 'manrope-modern':
        return "'Manrope', sans-serif";
      case 'nunito-soft':
        return "'Nunito Sans', sans-serif";
      case 'inter-clarity':
        return "'Inter', sans-serif";
      case 'poppins-premium':
        return "'Poppins', sans-serif";
      case 'source-balanced':
        return "'Source Sans 3', sans-serif";
      case 'work-calm':
        return "'Work Sans', sans-serif";
      case 'lato-trust':
        return "'Lato', sans-serif";
      case 'montserrat-luxe':
        return "'Montserrat', sans-serif";
      case 'rubik-friendly':
        return "'Rubik', sans-serif";
      default:
        return "'DM Sans', sans-serif";
    }
  }
}
