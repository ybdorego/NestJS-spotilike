import { AlbumService } from './../album.service';
import { Body, Controller, Get, Param, Post,  UsePipes, ValidationPipe } from '@nestjs/common';// Put,
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
// import { UpdateAlbumDto } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController {

	constructor(private albumservice: AlbumService) {
	}

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
    // @Put(':id')
    // async UpdateAlbum(
    //     @Param('id') 
    //     id: string,
    //     @Body()
    //     album: UpdateAlbumDto
    // ): Promise<Album> {
    //     return this.albumservice.updateById(id, album)
    // }

}
