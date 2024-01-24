import { Module } from '@nestjs/common';
import { UtilisateurController } from './controllers/utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './controllers/utilisateur.controller';

@Module({
  controllers: [UtilisateurController],
  providers: [UtilisateurService]
})
export class UtilisateurModule {}
