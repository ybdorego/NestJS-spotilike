import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Morceau } from './schemas/morceau.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class MorceauService {

        constructor(
        @InjectModel(Morceau.name)
        private morceauModel: mongoose.Model<Morceau>
        ) {}

        // afficher tout les morceaus 
        async findAll(): Promise<Morceau[]>{
            const morceaus = await this.morceauModel.find();
            return morceaus;
        }

        // crée un morceau
        async create(morceau: Morceau): Promise<Morceau>{
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

        // maj de l'morceau par son id
        async updateById(id: string, morceau: Morceau): Promise<Morceau>{
            return await this.morceauModel.findByIdAndUpdate(id,morceau, {
                     new: true,
                     runValidators :true
             });    
        }

}
