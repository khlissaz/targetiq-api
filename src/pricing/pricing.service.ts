import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pricing } from './pricing.entity';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepo: Repository<Pricing>,
  ) {}

  async getAll(language: 'en' | 'ar', currency: 'USD' | 'SAR') {
    const pricings = await this.pricingRepo.find();
    return pricings.map((p) => ({
      id: p.id,
      name: p.name,
      price: currency === 'SAR' ? p.priceSAR : p.priceUSD,
      description: language === 'ar' ? p.descriptionAr : p.descriptionEn,
    }));
  }
}
