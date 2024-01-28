import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './schemas/album.schema';
// import { MorceauSchema } from 'src/morceau/schemas/morceau.schema';
// import { GenreSchema } from 'src/genre/schemas/genre.schema';
import { ArtistShema } from 'src/artiste/schemas/artiste.schema';
import { ArtisteAlbumShema } from 'src/artiste-album/schemas/artisteAlbum.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name : 'Album', schema : AlbumSchema},
    {name : 'ArtisteAlbum', schema : ArtisteAlbumShema},
    // {name : 'Morceau', schema : MorceauSchema},
    {name : 'Artiste', schema : ArtistShema},
    // {name : 'Genre', schema : GenreSchema}
  
  ])],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
