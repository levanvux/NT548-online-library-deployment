import { Controller, Get, Post, Delete, Param, Req } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
@UseGuards(AuthGuard)
export class BookmarksController {
  constructor(private service: BookmarksService) {}

  @Get(':bookId')
  async check(@Req() req, @Param('bookId') bookId: number) {
    const userId = req.user.id;
    const exist = await this.service.isBookmarked(userId, bookId);
    return { bookmarked: !!exist };
  }

  @Post(':bookId')
  async add(@Req() req, @Param('bookId') bookId: number) {
    const userId = req.user.id;
    await this.service.add(userId, bookId);
    return { message: 'Bookmarked' };
  }

  @Delete(':bookId')
  async remove(@Req() req, @Param('bookId') bookId: number) {
    const userId = req.user.id;
    await this.service.remove(userId, bookId);
    return { message: 'Removed bookmark' };
  }
}
