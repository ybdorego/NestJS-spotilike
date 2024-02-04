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
        
        //  crée un artiste + verification de l'existance de celui ci 
        async create(artiste: CreateArtisteDto): Promise<Artiste>{
                const existingArtiste = await this.artisteModel.findOne({ nom: artiste.nom });

                if (existingArtiste) {
                        throw new BadRequestException('Cet artiste existe déjà.');
                }

                const res = await this.artisteModel.create(artiste);
                return res;
        }

        // trouvé l'artiste par son id + verification de l'id
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

        
        // trouvé l'artiste par son nom
        async findByName(nom: string): Promise<Artiste> {
                const artiste = await this.artisteModel.findOne({ nom: nom });
            
                if (!artiste) {
                    throw new NotFoundException('Artiste non trouvé');
                }
            
                return artiste;
            }
        
        // trouvé tous les artistes
        async findAll(): Promise<Artiste[]>{
                const artistes = await this.artisteModel.find();
                return artistes;
        }

        // afficher tout les albums d'un artiste grace a son id
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
        
        // maj de l'artiste par son id
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
        // suppression de l'artiste ainsi que de tout ces album
        async deleteArtiste(id: string): Promise<Artiste> {
                const artiste = await this.artisteModel.findById(id);
                if (!artiste) {
                    throw new NotFoundException('Artiste non trouvé');
                }
            
                // Supprimer les albums associés à l'artiste
                await this.albumModel.deleteMany({ artiste: id }).exec();
            
                // supprimer l'artiste lui-même
                await this.artisteModel.deleteOne({ _id: id }).exec();
            
                return artiste;
            }



}
