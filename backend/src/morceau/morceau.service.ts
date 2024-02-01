import { CreateMorceauDto } from './dto/create-morceau.dto';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Morceau } from './schemas/morceau.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { Artiste } from 'src/artiste/schemas/artiste.schema';
import { UpdateMorceauDto } from './dto/update-morceau.dto';

@Injectable()
export class MorceauService {

        constructor(
        @InjectModel(Morceau.name) private morceauModel: mongoose.Model<Morceau>,
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        ) {}

       
        async create(artisteid, createMorceauDto: CreateMorceauDto): Promise<Morceau>{
            const Artiste = await this.artisteModel.findById(artisteid)
        
            if(!Artiste) throw new HttpException("artiste non trouvé", 404);
        
            let morceau = await this.morceauModel.findOne({ titre: createMorceauDto.titre });
        
            if (morceau) {
                // Si le morceau existe déjà, on ajoute l'id de l'artiste au tableau artistes du morceau
                if (!morceau.artistes.includes(artisteid)) {
                    morceau.artistes.push(artisteid);
                    morceau = await morceau.save();
                }
                // Ajoute le morceau à la liste des morceaux de l'artiste
                if (!Artiste.morceaux.includes(morceau.id)) {
                    await Artiste.updateOne({
                        $push: {
                            morceaux: morceau.id,
                        },
                    });
                }
            } else {
                // Si le morceau n'existe pas, créez un nouveau morceau
                morceau = new this.morceauModel({...createMorceauDto, artistes: [artisteid]});
                morceau = await morceau.save();
        
                await Artiste.updateOne({
                    $push: {
                        morceaux: morceau.id,
                    },
                });
            }
        
            return morceau;
        }


         // afficher tout les morceaus 
         async findAll(): Promise<Morceau[]>{
            const morceaus = await this.morceauModel.find();
            return morceaus;
        }

        // crée un morceau seul 
        async createMorceauAlone(morceau: Morceau): Promise<Morceau>{
            const res = await this.morceauModel.create(morceau)
            return res;
        }

        // trouvé un morceau par son id
        async findById(id: string): Promise<Morceau>{

            const isvalid = mongoose.isValidObjectId(id)

            if(!isvalid){
                throw new BadRequestException('entrez un id valide.')
            }
            const morceau = await this.morceauModel.findById(id)

            if(!morceau){
                    throw new NotFoundException('Morceau non trouvée')
            }
            return morceau;
        }

        // trouvé un morceau par son nom
        async findMorceauByName(name: string): Promise<Morceau> {
            const morceau = await this.morceauModel.findOne({ titre: name });
        
            if (!morceau) {
                throw new NotFoundException('Morceau non trouvé');
            }
        
            return morceau;
        }

        // maj de l'morceau par son id
        async updateById(id: string, morceau: UpdateMorceauDto): Promise<Morceau>{
            return await this.morceauModel.findByIdAndUpdate(id,morceau, {
                     new: true,
                     runValidators :true
             });    
        }

        // Supprime un morceau
        async deleteById(id: string): Promise<void> {
            const isvalid = mongoose.isValidObjectId(id);

            if (!isvalid) {
                throw new BadRequestException('Entrez un id valide.');
            }

            const deletedMorceau = await this.morceauModel.findByIdAndDelete(id);

            if (!deletedMorceau) {
                throw new NotFoundException('Morceau non trouvé');
            }
        }

}
