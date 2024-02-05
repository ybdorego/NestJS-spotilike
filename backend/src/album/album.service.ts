import { Morceau } from './../morceau/schemas/morceau.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import mongoose from 'mongoose';
import { Artiste } from 'src/artiste/schemas/artiste.schema';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { CreateMorceauDto } from 'src/morceau/dto/create-morceau.dto';
import { CreateAlbumwithMorDto } from './dto/createAlbumwithMor.dto';
import { MorceauService } from 'src/morceau/morceau.service';

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
        @InjectModel(Artiste.name) private artisteModel: mongoose.Model<Artiste>,
        @InjectModel(Artiste.name) private morceauModel: mongoose.Model<Morceau>,
        private morceauService: MorceauService,
        ) {}


        //  crée un album 
        async create(artisteid, createAlbumDto: CreateAlbumDto): Promise<Album>{
            const existingAlbum = await this.albumModel.findOne({ titre: createAlbumDto.titre });
            
            console.log(existingAlbum);
            if(existingAlbum) throw new HttpException("L'album existe déjà", 400);

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

        async createAlbumAvecMorceau(idArtiste: string, createAlbumDto: CreateAlbumwithMorDto): Promise<Album> {
           
            const existingAlbum = await this.albumModel.findOne({ titre: createAlbumDto.titre });
            
            if (existingAlbum) {
                throw new HttpException("L'album existe déjà", 400);
            }
           
            const artiste = await this.artisteModel.findById(idArtiste);

            if (!artiste) {
                throw new NotFoundException('Artiste non trouvé');
            }
            const album = new this.albumModel(createAlbumDto);

            album.artiste = artiste._id;

            album.save()
            // Créer chaque morceau
            for (const createMorceauDto of createAlbumDto.morceaux) {
                console.log(album._id);
                await this.morceauService.createMorceauforalbum(artiste._id, album._id, createMorceauDto);
            }
        
            return album;
        }

        // // fonction qui cree un album et des morceau pour un artiste
        // async createAlbumAvecMorceau(artisteId: string, createAlbumDto: CreateAlbumDto, morceaux: CreateMorceauDto[]): Promise<Album> {
        //     const existingAlbum = await this.albumModel.findOne({ titre: createAlbumDto.titre });
        //     if (existingAlbum) {
        //         throw new HttpException("L'album existe déjà", 400);
        //     }

        //     const artiste = await this.artisteModel.findById(artisteId);
        //     if (!artiste) {
        //         throw new HttpException("Artiste non trouvé", 404);
        //     }

        //     const { ObjectId } = mongoose.Types;

        //     const newAlbum = new this.albumModel({ ...createAlbumDto, artiste: artisteId });
        //     const savedAlbum = await newAlbum.save();

        //     const morceauPromises = morceaux.map(async (morceau) => {
        //         const newMorceau = new this.morceauModel({ ...morceau, album: savedAlbum._id, artiste: artisteId });
        //         const savedMorceau = await newMorceau.save();
        //         savedAlbum.morceaux.push(savedMorceau._id);
        //         savedMorceau.artistes.push(ObjectId.createFromHexString(artisteId));
        //         await savedMorceau.save();
        //     });

        //     await Promise.all(morceauPromises);
        //     await savedAlbum.save();

        //     artiste.albums.push(savedAlbum._id);
        //     await artiste.save();

        //     return savedAlbum;
        // }

        // afficher tout les albums 
        async findAll(): Promise<Album[]>{
            const albums = await this.albumModel.find();
            return albums;
        }

        // afficher le ou les album d'un artiste grace a son idartiste 
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
