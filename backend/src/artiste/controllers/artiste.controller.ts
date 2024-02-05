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
    
    @Get()
    async getallartistes(): Promise<Artiste[]> {
        return this.artisteService.findAll();
    }
    
    // creation d'un artiste
    @Post()
    @UsePipes(new ValidationPipe())
    async createArtist(@Body() artiste: CreateArtisteDto): Promise<Artiste> {
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


    // touvée l'artiste et ces album par son id 
    @Get('Artistealbum/:id')
    async getArtisteAlbumById(
        @Param('id') 
        id: string
    ): Promise<Artiste> {
        return this.artisteService.getArtisteWithAlbums(id);
    }

    // mise a jours d'un artiste par son id 
    @Put(':id')
    async UpdateArtist(
        @Param('id') 
        id: string,
        @Body()
        artiste: UpdateArtisteDto
    ): Promise<Artiste> {
        return this.artisteService.updateById(id, artiste);
    }

    @Delete('albumArtiste/:id')
    async DeleteArtistAlbum(
        @Param('id') 
        id : string,
     ): Promise<Artiste> {
        return this.artisteService.deleteArtiste(id);
    }

}
