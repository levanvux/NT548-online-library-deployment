import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private repo: Repository<Bookmark>,
  ) {}

  isBookmarked(userId: number, bookId: number) {
    return this.repo.findOne({
      where: { user_id: userId, book_id: bookId },
    });
  }

  add(userId: number, bookId: number) {
    const item = this.repo.create({ user_id: userId, book_id: bookId });
    return this.repo.save(item);
  }

  remove(userId: number, bookId: number) {
    return this.repo.delete({ user_id: userId, book_id: bookId });
  }
}
