import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandLabService } from '../../core/services/brand-lab.service';
import {
  DEFAULT_LOGO_VARIANT,
  LogoVariantId
} from '../../shared/models/brand-lab.model';

@Component({
  selector: 'app-software-studios-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-studios-logo.component.html',
  styleUrl: './software-studios-logo.component.scss'
})
export class SoftwareStudiosLogoComponent implements OnInit, OnDestroy {
  @Input() compact = false;
  @Input() light = false;
  @Input() variant?: LogoVariantId;

  selectedVariant: LogoVariantId = DEFAULT_LOGO_VARIANT;
  private readonly subscription = new Subscription();

  constructor(private readonly brandLabService: BrandLabService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.brandLabService.logoVariant$.subscribe((value) => {
        this.selectedVariant = value;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get activeVariant(): LogoVariantId {
    return this.variant ?? this.selectedVariant;
  }
}
