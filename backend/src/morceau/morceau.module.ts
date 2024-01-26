import { Module } from '@nestjs/common';
import { MorceauController } from './controllers/morceau.controller';
import { MorceauService } from './morceau.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MorceauSchema } from './schemas/morceau.schema';

@Module({
  imports: [MongooseModule.forFeature([{name : 'Morceau', schema : MorceauSchema}])],
  controllers: [MorceauController],
  providers: [MorceauService]
})
export class MorceauModule {}
