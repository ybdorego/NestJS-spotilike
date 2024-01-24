import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtisteModule } from './artiste/artiste.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { MorceauModule } from './dry-run/morceau/morceau.module';
import { MorceauModule } from './morceau/morceau.module';
import { GenreModule } from './genre/genre.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
