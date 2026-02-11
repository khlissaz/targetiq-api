import { Controller, Get, Query } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  async getPricing(
    @Query('lang') lang: 'en' | 'ar' = 'en',
    @Query('currency') currency: 'USD' | 'SAR' = 'USD',
  ) {
    return this.pricingService.getAll(lang, currency);
  }
}
