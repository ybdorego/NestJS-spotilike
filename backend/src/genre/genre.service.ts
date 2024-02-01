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


         // crée un genre mais avant verifier si li n'existe pas deja
         
        async create(genre: Genre): Promise<Genre>{
            const existingGenre = await this.genreModel.findOne({ name: genre.titre });

            if (existingGenre) {
                throw new BadRequestException('Le genre existe déjà.');
            }

            const res = await this.genreModel.create(genre);
            return res;
        }

         // afficher tout les genres 
         async findAll(): Promise<Genre[]>{
            const genres = await this.genreModel.find();
            return genres;
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

        // trouvé un genre par son id 
        async findByName(name: string): Promise<Genre> {
            const genre = await this.genreModel.findOne({ name: name });
        
            if (!genre) {
                throw new NotFoundException('Genre not found');
            }
        
            return genre;
        }
       
        // mise a jour du genre par son id 
        async updateById(id: string, genre: Genre): Promise<Genre> {
            const existingGenre = await this.genreModel.findById(id);
            if (!existingGenre) {
                throw new NotFoundException('Genre non trouvé');
            }
        
            // Mettre à jour les propriétés du genre existant
            Object.assign(existingGenre, genre);
        
            // Sauvegarder le genre mis à jour
            const updatedGenre = await existingGenre.save();
        
            return updatedGenre;
        }


        // supression d'un genre

        async deleteById(id: string): Promise<Genre> {
            const deletedGenre = await this.genreModel.findByIdAndDelete(id);
        
            if (!deletedGenre) {
                throw new NotFoundException('Genre non trouvé');
            }
        
            return deletedGenre;
        }



}
