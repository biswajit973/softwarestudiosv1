export type LogoVariantId =
  | 'classic-block'
  | 'twin-pill'
  | 'orbital-grid'
  | 'ribbon-wave'
  | 'stacked-code'
  | 'signal-core'
  | 'split-arc'
  | 'pixel-frame'
  | 'vector-wing'
  | 'zen-window';

export interface LogoVariantOption {
  id: LogoVariantId;
  label: string;
  note: string;
}

export type FontPresetId =
  | 'classic-dm'
  | 'manrope-modern'
  | 'nunito-soft'
  | 'inter-clarity'
  | 'poppins-premium'
  | 'source-balanced'
  | 'work-calm'
  | 'lato-trust'
  | 'montserrat-luxe'
  | 'rubik-friendly';

export interface FontPresetOption {
  id: FontPresetId;
  label: string;
  note: string;
  preview: string;
}

export const DEFAULT_LOGO_VARIANT: LogoVariantId = 'pixel-frame';
export const DEFAULT_FONT_PRESET: FontPresetId = 'classic-dm';

export const LOGO_VARIANT_OPTIONS: readonly LogoVariantOption[] = [
  { id: 'classic-block', label: 'Classic Block', note: 'Core identity' },
  { id: 'twin-pill', label: 'Twin Pill', note: 'Rounded modern' },
  { id: 'orbital-grid', label: 'Orbital Grid', note: 'Global scale' },
  { id: 'ribbon-wave', label: 'Ribbon Wave', note: 'Flow + motion' },
  { id: 'stacked-code', label: 'Stacked Code', note: 'Developer lines' },
  { id: 'signal-core', label: 'Signal Core', note: 'Connectivity' },
  { id: 'split-arc', label: 'Split Arc', note: 'Balanced growth' },
  { id: 'pixel-frame', label: 'Pixel Frame', note: 'Digital precision' },
  { id: 'vector-wing', label: 'Vector Wing', note: 'Forward movement' },
  { id: 'zen-window', label: 'Zen Window', note: 'Minimal calm' }
];

export const FONT_PRESET_OPTIONS: readonly FontPresetOption[] = [
  {
    id: 'classic-dm',
    label: 'Classic DM',
    note: 'Current brand default',
    preview: 'Simple. Trusted. Digital.'
  },
  {
    id: 'manrope-modern',
    label: 'Manrope Modern',
    note: 'Crisp and premium',
    preview: 'Clear UI with calm clarity'
  },
  {
    id: 'nunito-soft',
    label: 'Nunito Soft',
    note: 'Friendly and warm',
    preview: 'Easy reading for everyone'
  },
  {
    id: 'inter-clarity',
    label: 'Inter Clarity',
    note: 'Neutral professional',
    preview: 'Sharp text for product pages'
  },
  {
    id: 'poppins-premium',
    label: 'Poppins Premium',
    note: 'Modern luxury',
    preview: 'Sleek visual with structure'
  },
  {
    id: 'source-balanced',
    label: 'Source Balanced',
    note: 'Editorial + practical',
    preview: 'Readable at every size'
  },
  {
    id: 'work-calm',
    label: 'Work Sans Calm',
    note: 'Business friendly',
    preview: 'Focused copy, less noise'
  },
  {
    id: 'lato-trust',
    label: 'Lato Trust',
    note: 'Classic corporate',
    preview: 'Reliable and stable tone'
  },
  {
    id: 'montserrat-luxe',
    label: 'Montserrat Luxe',
    note: 'High-end branding',
    preview: 'Confident visual voice'
  },
  {
    id: 'rubik-friendly',
    label: 'Rubik Friendly',
    note: 'Rounded tech comfort',
    preview: 'Approachable digital feel'
  }
];
