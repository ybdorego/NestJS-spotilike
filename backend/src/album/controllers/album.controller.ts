import { AlbumService } from './../album.service';
import { Body, Controller, Get, Param, Post,  Put,  UsePipes, ValidationPipe } from '@nestjs/common';// Put,
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
// import { CreateMorceauDto } from 'src/morceau/dto/create-morceau.dto';
import { CreateAlbumwithMorDto } from '../dto/createAlbumwithMor.dto';

@Controller('album')
export class AlbumController {

	constructor(private albumservice: AlbumService) {
	}


    // trouvé tous les albums
    @Get()
    async getallAlbums(): Promise<Album[]> {
        return this.albumservice.findAll();
    }


    // creation de l'album par id artiste
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

    // Création d'un album avec des morceaux
    @Post('create-with-morceau/:idArtiste')
    @UsePipes(new ValidationPipe)
    async createAlbumAvecMorceau(
        @Param('idArtiste') 
        idArtiste: string,
        @Body()
        createAlbumDto: CreateAlbumwithMorDto,
        // @Body('morceau')
        // createMorceauDto: CreateMorceauDto[]
    ): Promise<Album> { 
        return this.albumservice.createAlbumAvecMorceau(idArtiste, createAlbumDto);
    }

    // touvée l'album par son id 
    @Get(':id')
    async getAlbumById(
        @Param('id')
        id: string
    ): Promise<Album> {
        return this.albumservice.findById(id);
    }

    // affiche les album d'un artiste grace a son id 
    @Get('album/:idArtiste')
    async getArtisteAlbumByIdartiste(
        @Param('idArtiste') 
        idArtiste: string
    ): Promise<Album[]> {
        return this.albumservice.findAlbumsByArtisteId(idArtiste);
    }

    // mise a jours de l'album par son id 
    @Put(':id')
    async UpdateAlbum(
        @Param('id') 
        id: string,
        @Body()
        album: UpdateAlbumDto
    ): Promise<Album> {
        return this.albumservice.updateById(id, album)
    }

}
