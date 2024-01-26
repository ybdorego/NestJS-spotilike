import { Module } from '@nestjs/common';
import { MorceauController } from './controllers/morceau.controller';
import { MorceauService } from './morceau.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MorceauSchema } from './schemas/morceau.schema';
import { GenreSchema } from 'src/genre/schemas/genre.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name : 'Morceau', schema : MorceauSchema},
    {name : 'Genre', schema : GenreSchema}
  ])],
  controllers: [MorceauController],
  providers: [MorceauService]
})
export class MorceauModule {}
