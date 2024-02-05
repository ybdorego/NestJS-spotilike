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


        /**
         * Crée un nouveau genre.
         * @param genre - Les informations du genre à créer.
         * @returns Une promesse résolue avec le genre créé.
         * @throws {BadRequestException} Si un genre avec le même nom existe déjà.
         */  
        async create(genre: Genre): Promise<Genre>{
            const existingGenre = await this.genreModel.findOne({ name: genre.titre });

            if (existingGenre) {
                throw new BadRequestException('Le genre existe déjà.');
            }

            const res = await this.genreModel.create(genre);
            return res;
        }

         
        /**
         * Récupère tous les genres.
         * @returns Une promesse qui se résout avec un tableau de genres.
         */
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

        /**
         * Recherche un genre par son nom.
         * @param name - Le nom du genre à rechercher.
         * @returns Une promesse résolue avec le genre correspondant.
         * @throws {NotFoundException} Si le genre n'est pas trouvé.
         */
        async findByName(name: string): Promise<Genre> {
            const genre = await this.genreModel.findOne({ name: name });
        
            if (!genre) {
                throw new NotFoundException('Genre not found');
            }
        
            return genre;
        }
       

        
        /**
         * Met à jour un genre en utilisant son identifiant.
         *
         * @param id - L'identifiant du genre à mettre à jour.
         * @param genre - Les nouvelles données du genre.
         * @returns Une promesse qui se résout avec le genre mis à jour.
         * @throws {NotFoundException} Si le genre n'est pas trouvé.
         */
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


        /**
         * Supprime un genre en utilisant son identifiant.
         *
         * @param id - L'identifiant du genre à supprimer.
         * @returns Une promesse qui se résout avec le genre supprimé.
         * @throws {NotFoundException} Si le genre n'est pas trouvé.
         */
        async deleteById(id: string): Promise<Genre> {
            const deletedGenre = await this.genreModel.findByIdAndDelete(id);
        
            if (!deletedGenre) {
                throw new NotFoundException('Genre non trouvé');
            }
        
            return deletedGenre;
        }



}
