import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import mongoose from 'mongoose';

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name)
        private albumModel: mongoose.Model<Album>
        ) {}

        // afficher tout les albums 
        async findAll(): Promise<Album[]>{
            const albums = await this.albumModel.find();
            return albums;
        }

        // crée un album
        async create(album: Album): Promise<Album>{
            const res = await this.albumModel.create(album)
            return res;
        }

        // trouvé l'album par son id
        async findById(id: string): Promise<Album>{
            const album = await this.albumModel.findById(id)

            if(!album){
                    throw new NotFoundException('Album non trouvée')
            }
            return album;
        }

        // maj de l'album par son id
        async updateById(id: string, album: Album): Promise<Album>{
            return await this.albumModel.findByIdAndUpdate(id,album, {
                     new: true,
                     runValidators :true
             });    
        }


}
