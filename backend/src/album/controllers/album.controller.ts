import { AlbumService } from './../album.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Album } from '../schemas/album.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController {

	constructor(private albumservice: AlbumService) {
	}

    @Get()
    async getallAlbums(): Promise<Album[]> {
        return this.albumservice.findAll();
    }


    // creation de l'album
    @Post()
    async createAlbum(
        @Body()
        album: CreateAlbumDto
    ): Promise<Album> {
        return this.albumservice.create(album)
    }

    // touvée l'album par son id 
    @Get(':id')
    async getAlbumById(
        @Param('id') 
        id: string
    ): Promise<Album> {
        return this.albumservice.findById(id);
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
