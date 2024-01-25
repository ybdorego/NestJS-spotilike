import { Module } from '@nestjs/common';
import { UtilisateurController } from './controllers/utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';

@Module({
  controllers: [UtilisateurController],
  providers: [UtilisateurService]
})
export class UtilisateurModule {}
