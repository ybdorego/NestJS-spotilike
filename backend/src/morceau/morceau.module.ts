import { Module } from '@nestjs/common';
import { MorceauController } from './controllers/morceau.controller';
import { MorceauService } from './morceau.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MorceauSchema } from './schemas/morceau.schema';
import { GenreSchema } from 'src/genre/schemas/genre.schema';
import { ArtistShema } from 'src/artiste/schemas/artiste.schema';
import { AlbumSchema } from 'src/album/schemas/album.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name : 'Morceau', schema : MorceauSchema},
    {name : 'Artiste', schema : ArtistShema},
    {name : 'Album', schema : AlbumSchema},
    {name : 'Genre', schema : GenreSchema}
  ])],
  controllers: [MorceauController],
  providers: [MorceauService],
  exports: [MorceauService]
})
export class MorceauModule {}
