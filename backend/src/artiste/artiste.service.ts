import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Artiste } from './schemas/artiste.schema';
import { Morceau } from 'src/morceau/schemas/morceau.schema';
import { Album } from 'src/album/schemas/album.schema';
import { CreateArtisteDto } from './dto/create-artiste.dto';



@Injectable()
export class ArtisteService {

	constructor(
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        @InjectModel(Morceau.name) private morceauModel: mongoose.Model<Morceau>,
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        ) {}
        
        async findAll(): Promise<Artiste[]>{
                const artistes = await this.artisteModel.find();
                return artistes;
        }

        async create(artiste: CreateArtisteDto): Promise<Artiste>{
                const res = await this.artisteModel.create(artiste)
                return res;
        }

        // trouvé l'artiste par son id
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


        // maj de l'artiste par son id
        async updateById(id: string, artiste: Artiste): Promise<Artiste>{
               return await this.artisteModel.findByIdAndUpdate(id,artiste, {
                        new: true,
                        runValidators :true
                });    
        }

        // suppression de l'artiste ainsi que de tout les album
        async deleteArtiste(id: string): Promise<Artiste> {
                const artiste = await this.artisteModel.findById(id);
                if (!artiste) {
                    throw new NotFoundException('Artiste non trouvé');
                }
            
                // Supprimer les albums associés à l'artiste
                await this.albumModel.deleteMany({ artiste: id }).exec();
            
                // Enfin, supprimer l'artiste lui-même
                await this.artisteModel.deleteOne({ _id: id }).exec();
            
                return artiste;
            }

        async delete(id: string): Promise<Artiste>{
                return await this.artisteModel.findByIdAndDelete(id);
        }


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


}
