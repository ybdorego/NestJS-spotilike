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

        
        /**
         * Crée un nouvel album.
         * 
         * @param artisteid - L'ID de l'artiste associé à l'album.
         * @param createAlbumDto - Les données pour créer l'album.
         * @returns Une promesse qui se résout à l'album créé.
         * @throws HttpException si l'album existe déjà ou si l'artiste n'est pas trouvé.
         */
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

        /**
         * Crée un nouvel album avec des morceaux pour un artiste donné.
         * 
         * @param idArtiste - L'identifiant de l'artiste.
         * @param createAlbumDto - Les données pour créer l'album avec les morceaux.
         * @returns Une promesse résolue avec l'objet Album créé.
         * @throws HttpException si l'album existe déjà.
         * @throws NotFoundException si l'artiste n'est pas trouvé.
         */
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
            
            await artiste.updateOne({
                $push: {
                    albums: album.id,
                },
            })

            await album.save();

            // Créer chaque morceau
            for (const createMorceauDto of createAlbumDto.morceaux) {
                const morceau: any = await this.morceauService.createMorceauforalbum(artiste._id, album._id, createMorceauDto);
                morceau.album = album._id; // Assign the ID of the album to the morceau
                await morceau.save();
            }

            
            return album;
        }

        
        /**
         * Récupère les morceaux associés à un ID d'album donné.
         * @param albumId - L'ID de l'album.
         * @returns Une promesse qui se résout en un tableau d'objets Morceau.
         * @throws NotFoundException si l'album n'est pas trouvé.
         */
        async findMorceauxByAlbumId(albumId: string): Promise<Morceau[]> {
            const album = await this.albumModel.findById(albumId);
            
            if (!album) {
                throw new NotFoundException('Album non trouvé');
            }
            
            const morceaux = await this.morceauModel.find({ album: albumId });
            return morceaux;
        }

        
        /**
         * Récupère tous les albums de la base de données.
         * @returns Une promesse qui se résout avec un tableau d'albums.
         */
        async findAll(): Promise<Album[]>{
            const albums = await this.albumModel.find();
            return albums;
        }

        /**
         * Récupère tous les albums d'un artiste donné.
         * 
         * @param artisteId - L'identifiant de l'artiste.
         * @returns Une promesse qui se résout avec un tableau d'albums.
         */
        async findAlbumsByArtisteId(artisteId: string): Promise<Album[]> {
            const albums = await this.albumModel.find({ artiste: artisteId });
            return albums;
        }

        /**
         * Récupère un album par son identifiant.
         * 
         * @param id - L'identifiant de l'album.
         * @returns Une promesse qui se résout avec l'album trouvé.
         * @throws BadRequestException si l'identifiant n'est pas valide.
         * @throws NotFoundException si l'album n'est pas trouvé.
         */
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

        
        /**
         * Met à jour un album en utilisant son identifiant.
         *
         * @param id - L'identifiant de l'album à mettre à jour.
         * @param album - Les nouvelles données de l'album.
         * @returns Une promesse résolue avec l'album mis à jour.
         * @throws {NotFoundException} Si l'album n'est pas trouvé.
         */
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

        /**
         * Supprime un album et tous ses morceaux.
         *
         * @param id - L'ID de l'album à supprimer.
         * @returns Une promesse résolue une fois que l'album et tous ses morceaux ont été supprimés.
         * @throws {NotFoundException} Si l'album n'est pas trouvé.
         */
        async deleteAlbumById(id: string): Promise<void> {
            const existingAlbum = await this.albumModel.findById(id);
            if (!existingAlbum) {
                throw new NotFoundException('Album non trouvé');
            }
        
            // Obtenir les identifiants des morceaux associés à l'album
            const morceaux = await this.morceauModel.find({ album: id });
            const morceauIds = morceaux.map(morceau => morceau._id);
        
            // Supprimer tous les morceaux associés à l'album
            await this.morceauModel.deleteMany({ album: id });
        
            // Retirer ces morceaux de la liste des morceaux de chaque artiste
            for (const artistId of existingAlbum.artiste) {
                const artist = await this.artisteModel.findById(artistId);
                if (artist) {
                    artist.morceaux = artist.morceaux.filter(morceauId => !morceauIds.includes(morceauId));
                    await artist.save();
                }
            }
            // Supprimer l'album
            await this.albumModel.deleteOne({ _id: id });
        }

}
