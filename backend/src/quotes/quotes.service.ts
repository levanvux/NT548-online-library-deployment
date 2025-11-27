import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepo: Repository<Quote>,
  ) {}

  async random(): Promise<Quote | null> {
    const count = await this.quotesRepo.count();
    if (!count) return null;

    const randomIndex = Math.floor(Math.random() * count);

    const quote = await this.quotesRepo
      .createQueryBuilder('q')
      .offset(randomIndex)
      .limit(1)
      .getOne();

    return quote || null;
  }
}
