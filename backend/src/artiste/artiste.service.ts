import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Artiste } from './schemas/artiste.schema';
import { Morceau } from 'src/morceau/schemas/morceau.schema';
import { Album } from 'src/album/schemas/album.schema';
import { CreateArtisteDto } from './dto/create-artiste.dto';
import { UpdateArtisteDto } from './dto/update-artiste.dto';



@Injectable()
export class ArtisteService {

	constructor(
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        @InjectModel(Morceau.name) private morceauModel: mongoose.Model<Morceau>,
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        ) {}
        
        
        /**
         * Crée un nouvel artiste.
         * @param artiste - Les informations de l'artiste à créer.
         * @returns Une promesse résolue avec l'artiste créé.
         * @throws BadRequestException si l'artiste existe déjà.
         */
        async create(artiste: CreateArtisteDto): Promise<Artiste>{
                const existingArtiste = await this.artisteModel.findOne({ nom: artiste.nom });

                if (existingArtiste) {
                        throw new BadRequestException('Cet artiste existe déjà.');
                }

                const res = await this.artisteModel.create(artiste);
                return res;
        }

        
        /**
         * Recherche un artiste par son identifiant.
         * @param id L'identifiant de l'artiste à rechercher.
         * @returns Une promesse résolue avec l'artiste correspondant à l'identifiant.
         * @throws BadRequestException si l'identifiant n'est pas valide.
         * @throws NotFoundException si aucun artiste n'est trouvé avec l'identifiant donné.
         */
        async findById(id: string): Promise<Artiste>{

                const isvalid = mongoose.isValidObjectId(id)

                if(!isvalid){
                        throw new BadRequestException('entrez un ID correct.')
                }

                const artiste = await this.artisteModel.findById(id)

                if(!artiste){
                        throw new NotFoundException('Artiste non trouvée')
                }
                return artiste;
        }

        
        /**
         * Recherche un artiste par son nom.
         * @param nom Le nom de l'artiste à rechercher.
         * @returns Une promesse résolue avec l'artiste correspondant au nom.
         * @throws NotFoundException si aucun artiste n'est trouvé avec le nom donné.
         */
        async findByName(nom: string): Promise<Artiste> {
                const artiste = await this.artisteModel.findOne({ nom: nom });
            
                if (!artiste) {
                    throw new NotFoundException('Artiste non trouvé');
                }
            
                return artiste;
            }


        
        
        /**
         * Récupère tous les artistes.
         * @returns Une promesse qui se résout avec un tableau d'artistes.
         */
        async findAll(): Promise<Artiste[]>{
                const artistes = await this.artisteModel.find();
                return artistes;
        }


        /**
         * Récupère un artiste avec ses albums en fonction de l'identifiant.
         * @param id L'identifiant de l'artiste.
         * @returns Une promesse qui se résout avec l'objet Artiste contenant les albums.
         */
        async getArtisteWithAlbums(id: string): Promise<Artiste> {
                try {
                        const artiste = await this.artisteModel
                                .findById(id)
                                .populate({
                                        path: 'albums',
                                        model: 'Album',
                                })
                                .exec();

                        if (!artiste) {
                                throw new NotFoundException('Artiste non trouvé');
                        }

                        return artiste;
                } catch (error) {
                        throw new NotFoundException('Artiste non trouvé', error);
                }
        }


        /**
         * Met à jour un artiste.
         * @param id - L'identifiant de l'artiste à mettre à jour.
         * @param artiste - Les données de l'artiste à mettre à jour.
         * @returns Une promesse résolue avec l'artiste mis à jour.
         * @throws NotFoundException si l'artiste n'est pas trouvé.
         */
        async updateById(id: string, artiste: UpdateArtisteDto): Promise<Artiste> {
                const existingArtiste = await this.artisteModel.findById(id);
                if (!existingArtiste) {
                        throw new NotFoundException('Artiste non trouvé');
                }

                // Mettre à jour les propriétés de l'artiste existant
                Object.assign(existingArtiste, artiste);

                // Sauvegarder l'artiste mis à jour
                const updatedArtiste = await existingArtiste.save();

                return updatedArtiste;
        }

        /**
         * Supprime un artiste en fonction de son identifiant.
         * @param id L'identifiant de l'artiste à supprimer.
         * @returns Une promesse résolue avec l'artiste supprimé.
         * @throws NotFoundException si l'artiste n'est pas trouvé.
         */
        async deleteArtiste(id: string): Promise<Artiste> {
                const artiste = await this.artisteModel.findById(id);
                if (!artiste) {
                        throw new NotFoundException('Artiste non trouvé');
                }

                // Supprimer les albums associés à l'artiste
                await this.albumModel.deleteMany({ artiste: id }).exec();

                // Supprimer les morceaux associés aux albums de l'artiste
                await this.morceauModel.deleteMany({ album: { $in: artiste.albums } }).exec();

                // Supprimer l'artiste lui-même
                await this.artisteModel.deleteOne({ _id: id }).exec();

                return artiste;
        }



}
