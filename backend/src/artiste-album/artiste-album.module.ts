import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtisteAlbumShema } from './schemas/artisteAlbum.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name : 'artisteAlbum', schema : ArtisteAlbumShema},
      ])],
})
export class ArtisteAlbumModule {}
