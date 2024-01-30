import { CreateAlbumDto } from './dto/create-album.dto';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import mongoose from 'mongoose';
import { Artiste } from 'src/artiste/schemas/artiste.schema';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        ) {}


        //  crée un album 
        async create(artisteid, createAlbumDto: CreateAlbumDto): Promise<Album>{
            const Artiste = await this.artisteModel.findById(artisteid)
        
            if(!Artiste) throw new HttpException("artiste non trouvé", 404);
        
            const newAlbum = new this.albumModel({...createAlbumDto, artiste: artisteid});
            const saveAlbum = await newAlbum.save();
        
            await Artiste.updateOne({
                $push: {
                    albums: saveAlbum.id,
                },
            });
        
            return saveAlbum;
        }

        // afficher tout les albums 
        async findAll(): Promise<Album[]>{
            const albums = await this.albumModel.find();
            return albums;
        }

        // afficher le ou les album d'un artiste grace a son id 
        async findAlbumsByArtisteId(artisteId: string): Promise<Album[]> {
            const albums = await this.albumModel.find({ artiste: artisteId });
            return albums;
        }

        
        // trouvé l'album par son id
        async findById(id: string): Promise<Album>{

            const isvalid = mongoose.isValidObjectId(id)

            if(!isvalid){
                throw new BadRequestException('entrez un id valide.')
            }

            const album = await this.albumModel.findById(id)
            
            if(!album){
                    throw new NotFoundException('Album non trouvée')
            }
            return album;
        }

        // maj de l'album par son id
        async updateById(id: string, album: UpdateAlbumDto): Promise<Album> {
            const existingAlbum = await this.albumModel.findById(id);
            if (!existingAlbum) {
                throw new NotFoundException('Album non trouvé');
            }
        
            // Mettre à jour les propriétés de l'album existant
            Object.assign(existingAlbum, album);
        
            // Sauvegarder l'album mis à jour
            const updatedAlbum = await existingAlbum.save();
        
            return updatedAlbum;
        }


}
