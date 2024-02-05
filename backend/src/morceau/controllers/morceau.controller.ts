import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MorceauService } from '../morceau.service';
import { CreateMorceauDto } from '../dto/create-morceau.dto';
import { Morceau } from '../schemas/morceau.schema';
import { UpdateMorceauDto } from '../dto/update-morceau.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('morceau')
export class MorceauController {

    constructor(private morceauService: MorceauService) {
	}

    
    @Get()
    /**
     * Récupère tous les morceaux.
     * @returns Une promesse qui se résout avec un tableau de Morceau.
     */
    async getallMorceau(): Promise<Morceau[]> {
        return this.morceauService.findAll();
    }


    // creation d'un Morceau
    @Post('CreateArtiste/:idArtiste')
    @UsePipes(new ValidationPipe)
    /**
     * Crée un nouvel album.
     * 
     * @param idArtiste - L'identifiant de l'artiste.
     * @param morceau - Les informations du morceau à créer.
     * @returns Une promesse résolue avec le morceau créé.
     */
    async createAlbum(
        @Param('idArtiste') 
        idArtiste: string,
        @Body()
        morceau: CreateMorceauDto
    ): Promise<Morceau> { 
        return this.morceauService.create(idArtiste,morceau)
    }


    @Get(':id')
    /**
     * Récupère un morceau par son identifiant.
     *
     * @param id - L'identifiant du morceau.
     * @returns Une promesse résolue avec le morceau correspondant à l'identifiant.
     */
    async getMorceauById(
        @Param('id') 
        id: string
    ): Promise<Morceau> {
        return this.morceauService.findById(id);
    }

    
    @Put(':id')
    /**
     * Met à jour un morceau.
     *
     * @param id - L'identifiant du morceau à mettre à jour.
     * @param morceau - Les données de mise à jour du morceau.
     * @returns Une promesse résolue avec le morceau mis à jour.
     */
    async UpdateMorceau(
        @Param('id') 
        id: string,
        @Body()
        morceau: UpdateMorceauDto
    ): Promise<Morceau> {
        return this.morceauService.updateById(id, morceau)
    }




    
}
