import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtisteMorceauShema } from './schemas/artisteMorceau.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name : 'artisteMorceau', schema : ArtisteMorceauShema},
      ])],
})
export class ArtisteMorceauModule {}
