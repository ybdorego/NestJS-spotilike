import { ArtisteService } from '../artiste.service';
import { Body, Controller, Delete, Get, Param, Post,Put,UseGuards,UsePipes, ValidationPipe } from '@nestjs/common';//Put,
import { Artiste } from '../schemas/artiste.schema';
import { CreateArtisteDto } from '../dto/create-artiste.dto';
import { UpdateArtisteDto } from '../dto/update-artiste.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('artiste')
export class ArtisteController {


	constructor(private artisteService: ArtisteService) {}
    
    
   
    @Post('createArtiste')
    /**
     * Crée un nouvel artiste.
     * @param artiste Les informations de l'artiste à créer.
     * @returns Une promesse résolue avec l'artiste créé.
     */
    @UsePipes(new ValidationPipe())
    async createArtist(@Body() artiste: CreateArtisteDto): Promise<Artiste> {
        return this.artisteService.create(artiste)
    }
    


    @Get('all')
    /**
     * Récupère tous les artistes.
     * @returns Une promesse qui se résout en un tableau d'artistes.
     */
    async getallartistes(): Promise<Artiste[]> {
        return this.artisteService.findAll();
    }


    @Get(':id')
    /**
     * Récupère un artiste par son identifiant.
     * @param id L'identifiant de l'artiste.
     * @returns Une promesse qui se résout avec l'artiste correspondant à l'identifiant.
     */
    async getArtisteById(
        @Param('id') 
        id: string
    ): Promise<Artiste> {
        return this.artisteService.findById(id);
    }


    
    @Get('album/:id')
    /**
     * Récupère un artiste avec ses albums en fonction de l'identifiant.
     * @param id L'identifiant de l'artiste.
     * @returns Une promesse qui se résout avec l'objet Artiste contenant les albums.
     */
    async getArtisteAlbumById(
        @Param('id') 
        id: string
    ): Promise<Artiste> {
        return this.artisteService.getArtisteWithAlbums(id);
    }

    
    @Put('ArtisteUpdate/:id')
    /**
     * Met à jour un artiste.
     *
     * @param id - L'identifiant de l'artiste à mettre à jour.
     * @param artiste - Les données de l'artiste à mettre à jour.
     * @returns Une promesse résolue avec l'artiste mis à jour.
     */
    async UpdateArtist(
        @Param('id') 
        id: string,
        @Body()
        artiste: UpdateArtisteDto
    ): Promise<Artiste> {
        return this.artisteService.updateById(id, artiste);
    }

    @Delete('DeleteAllForArtiste/:id')
    /**
     * Supprime un artiste ainsi que ses album et ces morceaux.
     * @param id - L'identifiant de l'artiste.
     * @returns Une promesse qui se résout avec l'artiste supprimé.
     */
    async DeleteArtistAndAll(
        @Param('id') 
        id : string,
     ): Promise<Artiste> {
        return this.artisteService.deleteArtiste(id);
    }

}
