import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenreService } from '../genre.service';
import { Genre } from '../schemas/genre.schema';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('genre')
export class GenreController {

    constructor(private genreservice: GenreService) {
	}

    @Get()
    async getallGenres(): Promise<Genre[]> {
        return this.genreservice.findAll();
    }


    @Post()
    /**
     * Crée un genre.
     *
     * @param genre - Les informations du genre à créer.
     * @returns Une promesse résolue avec le genre créé.
     */
    async createGenre(
        @Body()
        genre: CreateGenreDto
    ): Promise<Genre> {
        return this.genreservice.create(genre)
    }

    @Get(':id')
    /**
     * Récupère un genre par son identifiant.
     *
     * @param id - L'identifiant du genre.
     * @returns Une promesse qui se résout avec le genre correspondant à l'identifiant donné.
     */
    async getGenreById(
        @Param('id') 
        id: string
    ): Promise<Genre> {
        return this.genreservice.findById(id);
    }

    @Put(':id')
    /**
     * Met à jour un genre.
     *
     * @param id - L'identifiant du genre à mettre à jour.
     * @param genre - Les données de mise à jour du genre.
     * @returns Une promesse qui se résout avec le genre mis à jour.
     */
    async UpdateGenre(
        @Param('id') 
        id: string,
        @Body()
        genre: UpdateGenreDto
    ): Promise<Genre> {
        return this.genreservice.updateById(id, genre)
    }
}
