import { CreateMorceauDto } from './dto/create-morceau.dto';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Morceau } from './schemas/morceau.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Album } from 'src/album/schemas/album.schema';
import { Artiste } from 'src/artiste/schemas/artiste.schema';

@Injectable()
export class MorceauService {

        constructor(
        @InjectModel(Morceau.name) private morceauModel: mongoose.Model<Morceau>,
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        ) {}

        // afficher tout les morceaus 
        async findAll(): Promise<Morceau[]>{
            const morceaus = await this.morceauModel.find();
            return morceaus;
        }


        //  crée un morceau relier a un artiste
        // async create(artisteid, createMorceauDto: CreateMorceauDto): Promise<Morceau>{
        //     const Artiste = await this.artisteModel.findById(artisteid)
        
        //     if(!Artiste) throw new HttpException("artiste non trouvé", 404);
        
        //     const newMorceau = new this.morceauModel({...createMorceauDto, artistes: artisteid});
        //     const saveMorceau = await newMorceau.save();
        
        //     await Artiste.updateOne({
        //         $push: {
        //             morceaux: saveMorceau.id,
        //         },
        //     });
        
        //     return saveMorceau;
        // }


        async create(artisteid, createMorceauDto: CreateMorceauDto): Promise<Morceau>{
            const Artiste = await this.artisteModel.findById(artisteid)
        
            if(!Artiste) throw new HttpException("artiste non trouvé", 404);
        
            let morceau = await this.morceauModel.findOne({ titre: createMorceauDto.titre });
        
            if (morceau) {
                // Si le morceau existe déjà, ajoutez l'ID de l'artiste à la liste des artistes du morceau
                if (!morceau.artistes.includes(artisteid)) {
                    morceau.artistes.push(artisteid);
                    morceau = await morceau.save();
                }
                // Ajoutez le morceau à la liste des morceaux de l'artiste
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

        // crée un morceau
        // async create(morceau: Morceau): Promise<Morceau>{
        //     const res = await this.morceauModel.create(morceau)
        //     return res;
        // }

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

        // maj de l'morceau par son id
        async updateById(id: string, morceau: Morceau): Promise<Morceau>{
            return await this.morceauModel.findByIdAndUpdate(id,morceau, {
                     new: true,
                     runValidators :true
             });    
        }

}
