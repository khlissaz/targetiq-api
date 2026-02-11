import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditType } from './entities/credits.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}
 
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserCredits(@Req() req: any) {
    const userId = req.user.userId;
    return this.creditsService.getUserCredits(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('scraping-limit')
  async getScrapingLimit(@Req() req: any) {
    const userId = req.user.userId;
    const result = await this.creditsService.getScrapingLimit(userId);
    return result;
  }

  // New endpoint to increment scrape count (decrement daily limit)
  @UseGuards(JwtAuthGuard)
  @Post('scraping-limit/increment')
  async incrementScrapeCount(@Req() req: any, @Body('items') items: number) {
    const userId = req.user.userId;
    // You may want to validate 'items' here
    return this.creditsService.incrementScrapeCount(userId, items);
  }

    @UseGuards(JwtAuthGuard)
    @Get('enrichment-limit')
    getEnrichmentLimit(@Req() req: any) {
        const userId = req.user.userId;
        return this.creditsService.getEnrichmentCredit(userId);
    }

  @Post('add')
  addCredits(@Body() body: { userId: string; type: CreditType; amount: number }) {
    return this.creditsService.addCredits({ id: body.userId } as any, body.type, body.amount);
  }

  @Post('deduct')
  deductCredits(@Body() body: { userId: string; type: CreditType; amount: number }) {
    return this.creditsService.deductCredits(body.userId, body.type, body.amount);
  }

  @Post('set')
  setCredits(@Body() body: { userId: string; type: CreditType; amount: number }) {
    return this.creditsService.setCredits(body.userId, body.type, body.amount);
  }
}
