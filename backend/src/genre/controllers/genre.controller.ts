import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GenreService } from '../genre.service';
import { Genre } from '../schemas/genre.schema';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';

@Controller('genre')
export class GenreController {

    constructor(private genreservice: GenreService) {
	}

    @Get()
    async getallGenres(): Promise<Genre[]> {
        return this.genreservice.findAll();
    }


    // creation d'un Genre
    @Post()
    async createGenre(
        @Body()
        genre: CreateGenreDto
    ): Promise<Genre> {
        return this.genreservice.create(genre)
    }

    // touvée un Genre par son id 
    @Get(':id')
    async getGenreById(
        @Param('id') 
        id: string
    ): Promise<Genre> {
        return this.genreservice.findById(id);
    }

    // mise a jours d'un genre par son id 
    @Put(':id')
    async UpdateGenre(
        @Param('id') 
        id: string,
        @Body()
        genre: UpdateGenreDto
    ): Promise<Genre> {
        return this.genreservice.updateById(id, genre)
    }
}
