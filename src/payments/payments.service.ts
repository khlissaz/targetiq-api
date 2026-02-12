import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async createPayment(user: User, amount: number, currency: string) {
    // Here you would call PayTabs API to create a payment session and get a payment URL/sessionId
    // For now, just create a pending payment record
    const payment = this.paymentRepo.create({
      user,
      amount,
      currency,
      status: 'pending',
    });
    return this.paymentRepo.save(payment);
  }

  async updatePaymentStatus(id: string, status: string, providerSessionId?: string) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new Error('Payment not found');
    payment.status = status;
    if (providerSessionId) payment.providerSessionId = providerSessionId;
    return this.paymentRepo.save(payment);
  }
}
