import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genre } from './genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async getAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }
}
