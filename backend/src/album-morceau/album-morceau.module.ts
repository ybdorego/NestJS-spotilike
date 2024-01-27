import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumMorceauShema } from './schemas/albumMorceau.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name : 'albumMorceau', schema : AlbumMorceauShema},
      ])],
})
export class AlbumMorceauModule {}
