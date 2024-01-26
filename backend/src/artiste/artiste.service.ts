import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Artiste } from './schemas/artiste.schema';


@Injectable()
export class ArtisteService {

	constructor(
        @InjectModel(Artiste.name)
        private artisteModel: mongoose.Model<Artiste>
        ) {}
        
        async findAll(): Promise<Artiste[]>{
                const artistes = await this.artisteModel.find();
                return artistes;
        }

        async create(artiste: Artiste): Promise<Artiste>{
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


}
