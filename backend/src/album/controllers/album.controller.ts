import { AlbumService } from './../album.service';
import { Body, Controller, Delete, Get, Param, Post,  Put,  UseGuards,  UsePipes, ValidationPipe } from '@nestjs/common';// Put,
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { CreateAlbumwithMorDto } from '../dto/createAlbumwithMor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Morceau } from 'src/morceau/schemas/morceau.schema';
@UseGuards(JwtAuthGuard)
@Controller('album')
/**
 * Controller class for managing albums.
 */
export class AlbumController {

	constructor(private albumservice: AlbumService) {
	}


    
    /**
     * Récupère la liste de tous les albums
     * @returns A promise that resolves to an array of albums.
     */
    @Get()
    async getallAlbums(): Promise<Album[]> {
        return this.albumservice.findAll();
    }


    /**
     * Crée un nouvel album pour un artiste donné.
     * 
     * @param idArtiste - L'identifiant de l'artiste.
     * @param album - Les informations de l'album à créer.
     * @returns Une promesse qui se résout avec l'album créé.
     */
    @Post('create/:idArtiste')
    @UsePipes(new ValidationPipe)
    async createAlbum(
        @Param('idArtiste') 
        idArtiste: string,
        @Body()
        album: CreateAlbumDto
    ): Promise<Album> { 
        return this.albumservice.create(idArtiste,album)
    }

    
    /**
     * Crée un album avec des morceaux.
     *
     * @param idArtiste - L'identifiant de l'artiste.
     * @param createAlbumDto - Les données pour créer l'album avec les morceaux.
     * @returns Une promesse qui se résout avec l'album créé.
     */
    @Post('create-Album-morceau/:idArtiste')
    @UsePipes(new ValidationPipe)
    async createAlbumAvecMorceau(
        @Param('idArtiste') 
        idArtiste: string,
        @Body()
        createAlbumDto: CreateAlbumwithMorDto,
    ): Promise<Album> { 
        return this.albumservice.createAlbumAvecMorceau(idArtiste, createAlbumDto);
    }

    
    /**
     * Récupère un album par son identifiant.
     *
     * @param id - L'identifiant de l'album.
     * @returns Une promesse qui se résout avec l'album correspondant à l'identifiant donné.
     */
    @Get(':id')
    async getAlbumById(
        @Param('id')
        id: string
    ): Promise<Album> {
        return this.albumservice.findById(id);
    }

    
    /**
     * Récupère les albums d'un artiste en fonction de son identifiant.
     *
     * @param idArtiste L'identifiant de l'artiste.
     * @returns Une promesse qui se résout avec un tableau d'objets Album.
     */
    @Get('album/:idArtiste')
    async getArtisteAlbumByIdartiste(
        @Param('idArtiste') 
        idArtiste: string
    ): Promise<Album[]> {
        return this.albumservice.findAlbumsByArtisteId(idArtiste);
    } 

    /**
     * Récupère les morceaux d'un album en fonction de son identifiant.
     *
     * @param idAlbum - L'identifiant de l'album.
     * @returns Une promesse qui se résout avec un tableau d'objets Morceau.
     */
    @Get('morceaux/:idAlbum')
    async findMorceauxByAlbumId(
        @Param('idAlbum')
        idAlbum: string
    ): Promise<Morceau[]> {
        return this.albumservice.findMorceauxByAlbumId(idAlbum);
    }







    

    
    /**
     * Met à jour un album.
     *
     * @param id - L'identifiant de l'album à mettre à jour.
     * @param album - Les données de l'album à mettre à jour.
     * @returns Une promesse résolue avec l'album mis à jour.
     */
    @Put(':id')
    async UpdateAlbum(
        @Param('id') 
        id: string,
        @Body()
        album: UpdateAlbumDto
    ): Promise<Album> {
        return this.albumservice.updateById(id, album)
    }

    /**
     * Supprime un album par son identifiant.
     *
     * @param id - L'identifiant de l'album à supprimer.
     * @returns Une promesse qui se résout avec l'album supprimé.
     */
    @Delete(':id')
    async deleteAlbumById(
        @Param('id')
        id: string
    ): Promise<void> {
        await this.albumservice.deleteAlbumById(id);
    }

}
