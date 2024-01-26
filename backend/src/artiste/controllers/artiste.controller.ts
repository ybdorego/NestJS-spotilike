import { ArtisteService } from '../artiste.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Artiste } from '../schemas/artiste.schema';
import { CreateArtisteDto } from '../dto/create-artiste.dto';
import { UpdateArtisteDto } from '../dto/update-artiste.dto';

@Controller('artiste')
export class ArtisteController {


	constructor(private artisteService: ArtisteService) {}

    @Get()
    async getallartistes(): Promise<Artiste[]> {
        return this.artisteService.findAll();
    }
    
    // creation d'un artiste
    @Post()
    async createArtist(
        @Body()
        artiste: CreateArtisteDto
    ): Promise<Artiste> {
        return this.artisteService.create(artiste)
    }


    // touvée l'artiste par son id 
    @Get(':id')
    async getArtisteById(
        @Param('id') 
        id: string
    ): Promise<Artiste> {
        return this.artisteService.findById(id);
    }

    // mise a jours d'un artiste par son id 
    @Put(':id')
    async UpdateArtist(
        @Param('id') 
        id: string,
        @Body()
        artiste: UpdateArtisteDto
    ): Promise<Artiste> {
        return this.artisteService.updateById(id, artiste)
    }
    



}
