import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DEFAULT_FONT_PRESET,
  DEFAULT_LOGO_VARIANT,
  FONT_PRESET_OPTIONS,
  FontPresetId,
  LOGO_VARIANT_OPTIONS,
  LogoVariantId
} from '../../shared/models/brand-lab.model';

@Injectable({
  providedIn: 'root'
})
export class BrandLabService {
  private readonly logoStorageKey = 'software-studios-logo-variant-v2';
  private readonly fontStorageKey = 'software-studios-font-preset-v2';

  private readonly logoVariantSubject = new BehaviorSubject<LogoVariantId>(DEFAULT_LOGO_VARIANT);
  readonly logoVariant$ = this.logoVariantSubject.asObservable();

  private readonly fontPresetSubject = new BehaviorSubject<FontPresetId>(DEFAULT_FONT_PRESET);
  readonly fontPreset$ = this.fontPresetSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.restorePreferences();
  }

  get logoVariant(): LogoVariantId {
    return this.logoVariantSubject.value;
  }

  get fontPreset(): FontPresetId {
    return this.fontPresetSubject.value;
  }

  setLogoVariant(id: LogoVariantId): void {
    if (!this.isValidLogoVariant(id)) {
      return;
    }
    this.logoVariantSubject.next(id);
    this.setStorage(this.logoStorageKey, id);
  }

  setFontPreset(id: FontPresetId): void {
    if (!this.isValidFontPreset(id)) {
      return;
    }
    this.fontPresetSubject.next(id);
    this.applyFontPreset(id);
    this.setStorage(this.fontStorageKey, id);
  }

  private restorePreferences(): void {
    const savedLogo = this.getStorage(this.logoStorageKey);
    const savedFont = this.getStorage(this.fontStorageKey);

    if (savedLogo && this.isValidLogoVariant(savedLogo)) {
      this.logoVariantSubject.next(savedLogo);
    }

    const resolvedFont =
      savedFont && this.isValidFontPreset(savedFont) ? savedFont : DEFAULT_FONT_PRESET;

    this.fontPresetSubject.next(resolvedFont);
    this.applyFontPreset(resolvedFont);
  }

  private applyFontPreset(id: FontPresetId): void {
    this.document.documentElement.setAttribute('data-font-preset', id);
  }

  private isValidLogoVariant(value: string): value is LogoVariantId {
    return LOGO_VARIANT_OPTIONS.some((variant) => variant.id === value);
  }

  private isValidFontPreset(value: string): value is FontPresetId {
    return FONT_PRESET_OPTIONS.some((preset) => preset.id === value);
  }

  private setStorage(key: string, value: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(key, value);
  }

  private getStorage(key: string): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(key);
  }
}
