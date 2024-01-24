import { Module } from '@nestjs/common';
import { ArtisteController } from './controllers/artiste.controller';
import { ArtisteService } from './artiste.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistShema } from './schemas/artiste.schema';

@Module({
  imports: [MongooseModule.forFeature([{name : 'Artiste', schema : ArtistShema}])],
  controllers: [ArtisteController],
  providers: [ArtisteService, ]
})
export class ArtisteModule {}