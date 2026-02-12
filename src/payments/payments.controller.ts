import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @Req() req: any,
    @Body() body: { amount: number; currency: string },
  ) {
    // In production, validate amount/currency and check plan
    const user = req.user;
    const payment = await this.paymentsService.createPayment(user, body.amount, body.currency);
    // Here you would return the PayTabs payment URL/sessionId
    return { paymentId: payment.id, status: payment.status };
  }
}
