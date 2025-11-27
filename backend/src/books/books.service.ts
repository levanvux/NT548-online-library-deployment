import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { normalize } from '../utils/normalize.util';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepo.find();
  }

  findByIsbn(isbn: string): Promise<Book | null> {
    return this.booksRepo.findOne({ where: { isbn } });
  }

  async recommended(limit: number, isbn?: string): Promise<Book[]> {
    if (!limit || limit <= 0) return [];

    const qb = this.booksRepo
      .createQueryBuilder('b')
      .orderBy('RAND()')
      .limit(limit);

    if (isbn) {
      qb.where('b.isbn != :isbn', { isbn });
    }

    return qb.getMany();
  }
  async search(
    query: string,
    fromYear?: number,
    toYear?: number,
  ): Promise<Book[]> {
    let qb = this.booksRepo.createQueryBuilder('b');

    if (fromYear) qb = qb.andWhere('b.year >= :fromYear', { fromYear });
    if (toYear) qb = qb.andWhere('b.year <= :toYear', { toYear });

    if (query) {
      const q = `%${normalize(query)}%`;

      qb = qb.andWhere(
        `
        LOWER(b.title) LIKE :q 
        OR LOWER(b.publisher) LIKE :q
        OR JSON_SEARCH(JSON_EXTRACT(b.author, '$'), 'all', :q) IS NOT NULL
        OR JSON_SEARCH(JSON_EXTRACT(b.genres, '$'), 'all', :q) IS NOT NULL
        `,
        { q },
      );
    }

    return qb.getMany();
  }
}
