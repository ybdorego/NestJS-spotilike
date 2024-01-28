import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './schemas/genre.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class GenreService {

        constructor(
        @InjectModel(Genre.name)
        private genreModel: mongoose.Model<Genre>
        ) {}

        // afficher tout les genres 
        async findAll(): Promise<Genre[]>{
            const genres = await this.genreModel.find();
            return genres;
        }

        // crée un genre
        async create(genre: Genre): Promise<Genre>{
            const res = await this.genreModel.create(genre)
            return res;
        }

        // trouvé le genre par son id
        async findById(id: string): Promise<Genre>{

            const isvalid = mongoose.isValidObjectId(id)

            if(!isvalid){
                    throw new BadRequestException('entrez un ID correct.')
            }

            const genre = await this.genreModel.findById(id)

            if(!genre){
                    throw new NotFoundException('genre non trouvée')
            }
            return genre;
        }

        // maj de le genre par son id
        async updateById(id: string, genre: Genre): Promise<Genre>{
            return await this.genreModel.findByIdAndUpdate(id,genre, {
                     new: true,
                     runValidators :true
             });    
        }

}
