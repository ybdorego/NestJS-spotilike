import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album.controller';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './schemas/album.schema';
// import { MorceauSchema } from 'src/morceau/schemas/morceau.schema';
// import { GenreSchema } from 'src/genre/schemas/genre.schema';
import { ArtistShema } from 'src/artiste/schemas/artiste.schema';
import { MorceauSchema } from 'src/morceau/schemas/morceau.schema';
import { MorceauModule } from 'src/morceau/morceau.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MorceauModule,
    MongooseModule.forFeature([
    {name : 'Album', schema : AlbumSchema},
    {name : 'Artiste', schema : ArtistShema},
    {name : 'Morceau', schema : MorceauSchema}
  
  ]), 
],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
