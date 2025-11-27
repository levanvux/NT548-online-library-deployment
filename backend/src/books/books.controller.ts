import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(@Query('limit') limit?: string, isbn?: string) {
    return limit
      ? this.booksService.recommended(Number(limit), isbn)
      : this.booksService.findAll();
  }

  @Get('search')
  search(
    @Query('query') query = '',
    @Query('fromYear') fromYear?: string,
    @Query('toYear') toYear?: string,
  ) {
    return this.booksService.search(
      query,
      fromYear ? Number(fromYear) : undefined,
      toYear ? Number(toYear) : undefined,
    );
  }

  @Get(':isbn')
  async getByIsbn(@Param('isbn') isbn: string) {
    const book = await this.booksService.findByIsbn(isbn);
    if (!book) throw new NotFoundException('Không tìm thấy sách');
    return book;
  }

  // @Get(':isbn/related')
  // getRelated(@Param('isbn') isbn: string, @Query('limit') limit = 6) {
  //   return this.booksService.related(Number(limit), isbn);
  // }

  @Get(':isbn/pdf')
  async getPdf(@Param('isbn') isbn: string) {
    const book = await this.booksService.findByIsbn(isbn);
    if (!book) throw new NotFoundException('Không tìm thấy sách');
    if (!book.pdfUrl) throw new NotFoundException('Không có PDF');
    return { url: book.pdfUrl };
  }
}
