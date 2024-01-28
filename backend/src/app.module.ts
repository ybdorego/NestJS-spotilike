import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtisteModule } from './artiste/artiste.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { MorceauModule } from './morceau/morceau.module';
import { GenreModule } from './genre/genre.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ArtisteAlbumModule } from './artiste-album/artiste-album.module';
import { AlbumMorceauModule } from './album-morceau/album-morceau.module';
import { ArtisteMorceauModule } from './artiste-morceau/artiste-morceau.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URL),
    ArtisteModule,
    AlbumModule,
    MorceauModule,
    GenreModule,
    UtilisateurModule,
    ArtisteAlbumModule,
    AlbumMorceauModule,
    ArtisteMorceauModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
