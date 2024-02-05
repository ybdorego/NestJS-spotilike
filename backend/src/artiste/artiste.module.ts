import { Module } from '@nestjs/common';
import { ArtisteController } from './controllers/artiste.controller';
import { ArtisteService } from './artiste.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistShema } from './schemas/artiste.schema';
import { AlbumSchema } from 'src/album/schemas/album.schema';
import { MorceauSchema } from 'src/morceau/schemas/morceau.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
    {name : 'Artiste', schema : ArtistShema},
    {name : 'Album', schema : AlbumSchema},
    {name : 'Morceau', schema : MorceauSchema}
  ])
],
  controllers: [ArtisteController],
  providers: [ArtisteService]
})
export class ArtisteModule {

}