import { Module } from '@nestjs/common';
import { GenreController } from './controllers/genre.controller';
import { GenreService } from './genre.service';

@Module({
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
