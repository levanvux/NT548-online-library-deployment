import { Controller, Get, NotFoundException } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Quote } from './quote.entity';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('random')
  async getRandom(): Promise<Quote> {
    const quote = await this.quotesService.random();
    if (!quote) throw new NotFoundException('Không tìm thấy quote nào');
    return quote;
  }
}
