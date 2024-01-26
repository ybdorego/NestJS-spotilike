import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MorceauService } from '../morceau.service';
import { CreateMorceauDto } from '../dto/create-morceau.dto';
import { UpdateMorceauDto } from '../dto/update-morceau.dto';
import { Morceau } from '../schemas/morceau.schema';

@Controller('morceau')
export class MorceauController {

    constructor(private morceauservice: MorceauService) {
	}

    @Get()
    async getallMorceau(): Promise<Morceau[]> {
        return this.morceauservice.findAll();
    }


    // creation d'un Morceau
    @Post()
    async createMorceau(
        @Body()
        morceau: CreateMorceauDto
    ): Promise<Morceau> {
        return this.morceauservice.create(morceau)
    }

    // touvée un morceau par son id 
    @Get(':id')
    async getMorceauById(
        @Param('id') 
        id: string
    ): Promise<Morceau> {
        return this.morceauservice.findById(id);
    }

    // mise a jours d'un morceau par son id 
    @Put(':id')
    async UpdateMorceau(
        @Param('id') 
        id: string,
        @Body()
        morceau: UpdateMorceauDto
    ): Promise<Morceau> {
        return this.morceauservice.updateById(id, morceau)
    }
}
