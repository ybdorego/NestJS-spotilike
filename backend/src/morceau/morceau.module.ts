import { Module } from '@nestjs/common';
import { MorceauController } from './controllers/morceau.controller';
import { MorceauService } from './morceau.service';

@Module({
  controllers: [MorceauController],
  providers: [MorceauService]
})
export class MorceauModule {}
