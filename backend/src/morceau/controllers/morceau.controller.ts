import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MorceauService } from '../morceau.service';
import { CreateMorceauDto } from '../dto/create-morceau.dto';
import { UpdateMorceauDto } from '../dto/update-morceau.dto';
import { Morceau } from '../schemas/morceau.schema';

@Controller('morceau')
export class MorceauController {

    constructor(private morceauService: MorceauService) {
	}

    @Get()
    async getallMorceau(): Promise<Morceau[]> {
        return this.morceauService.findAll();
    }


    // creation d'un Morceau
    @Post()
    @UsePipes(new ValidationPipe())
    async createMorceau(
        @Body()
        morceau: CreateMorceauDto
    ): Promise<Morceau> {
        return this.morceauService.create(morceau)
    }

    // touvée un morceau par son id 
    @Get(':id')
    async getMorceauById(
        @Param('id') 
        id: string
    ): Promise<Morceau> {
        return this.morceauService.findById(id);
    }

    // mise a jours d'un morceau par son id 
    @Put(':id')
    async UpdateMorceau(
        @Param('id') 
        id: string,
        @Body()
        morceau: UpdateMorceauDto
    ): Promise<Morceau> {
        return this.morceauService.updateById(id, morceau)
    }
}
