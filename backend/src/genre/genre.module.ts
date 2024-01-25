import { Module } from '@nestjs/common';
import { GenreController } from './controllers/genre.controller';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreSchema } from './schemas/genre.schema';
 
@Module({
  imports: [MongooseModule.forFeature([{name : 'Genre', schema : GenreSchema}])],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
