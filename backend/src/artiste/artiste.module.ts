import { Module } from '@nestjs/common';
import { ArtisteController } from './controllers/artiste.controller';
import { ArtisteService } from './artiste.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistShema } from './schemas/artiste.schema';
import { AlbumSchema } from 'src/album/schemas/album.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name : 'Artiste', schema : ArtistShema},
    {name : 'Album', schema : AlbumSchema},
  ])],
  controllers: [ArtisteController],
  providers: [ArtisteService]
})
export class ArtisteModule {

}