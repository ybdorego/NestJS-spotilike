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
        
        /**
         * Crée un morceau pour un album donné.
         *
         * @param artisteid - L'ID de l'artiste associé au morceau.
         * @param albumId - L'ID de l'album auquel le morceau appartient.
         * @param createMorceauDto - Les données du morceau à créer.
         * @returns Une promesse résolue avec le morceau créé.
         * @throws {HttpException} Si l'artiste ou l'album n'est pas trouvé.
         */
        async createMorceauforalbum(artisteid, albumId: mongoose.Types.ObjectId,  createMorceauDto: CreateMorceauDto): Promise<Morceau>{
            const Artiste = await this.artisteModel.findById(artisteid)
        
            if(!Artiste) throw new HttpException("artiste non trouvé", 404);
        
            let morceau = await this.morceauModel.findOne({ titre: createMorceauDto.titre });
        
            const Album = await this.albumModel.findById(albumId);
            if (!Album) throw new HttpException("album non trouvé", 404);
        
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

        /**
         * Crée un morceau pour un artiste donné.
         *
         * @param artisteid - L'ID de l'artiste associé au morceau.
         * @param createMorceauDto - Les données du morceau à créer.
         * @returns Une promesse résolue avec le morceau créé.
         * @throws {HttpException} Si l'artiste n'est pas trouvé.
         */
        async create(artisteid,  createMorceauDto: CreateMorceauDto): Promise<Morceau>{
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


        /**
         * Récupère tous les morceaux.
         * @returns Une promesse qui se résout avec un tableau de morceaux.
         */
         async findAll(): Promise<Morceau[]>{
            const morceaus = await this.morceauModel.find();
            return morceaus;
        }

        
        /**
         * Crée un morceau individuel.
         *
         * @param morceau - Les informations du morceau à créer.
         * @returns Une promesse résolue avec le morceau créé.
         */
        async createMorceauAlone(morceau: Morceau): Promise<Morceau>{
            const res = await this.morceauModel.create(morceau)
            return res;
        }

        
        /**
         * Recherche un morceau par son identifiant.
         * @param id L'identifiant du morceau à rechercher.
         * @returns Une promesse résolue avec le morceau correspondant à l'identifiant.
         * @throws BadRequestException si l'identifiant n'est pas valide.
         * @throws NotFoundException si aucun morceau n'est trouvé avec l'identifiant donné.
         */
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

        /**
         * Récupère un morceau par son nom.
         * @param name Le nom du morceau à rechercher.
         * @returns Une promesse résolue avec le morceau correspondant au nom.
         * @throws NotFoundException si aucun morceau n'est trouvé avec le nom donné.
         */
        async findMorceauByName(name: string): Promise<Morceau> {
            const morceau = await this.morceauModel.findOne({ titre: name });
        
            if (!morceau) {
                throw new NotFoundException('Morceau non trouvé');
            }
        
            return morceau;
        }

        
        /**
         * Met à jour un morceau en utilisant son identifiant.
         *
         * @param id - L'identifiant du morceau à mettre à jour.
         * @param morceau - Les données de mise à jour du morceau.
         * @returns Une promesse qui se résout avec le morceau mis à jour.
         */
        // async updateById(id: string, morceau: UpdateMorceauDto): Promise<Morceau>{
        //     return await this.morceauModel.findByIdAndUpdate(id,morceau, {
        //              new: true,
        //              runValidators :true
        //      });    
        // }

        async updateById(id: string, morceau: UpdateMorceauDto): Promise<Morceau> {
            const existinMorceau = await this.morceauModel.findById(id);
            if (!existinMorceau) {
                    throw new NotFoundException('morceau non trouvé');
            }

            // Mettre à jour les propriétés du morceau existant
            Object.assign(existinMorceau, morceau);

            // Sauvegarder le morceau mis à jour
            const updatedMorceau = await existinMorceau.save();

            return updatedMorceau;
    }

        /**
         * Supprime un morceau, en le retirant de l'album et de l'artiste associés.
         *
         * @param id - L'identifiant du morceau à supprimer.
         * @returns Une promesse qui se résout lorsque le morceau est supprimé avec succès.
         * @throws {BadRequestException} Si l'identifiant n'est pas valide.
         * @throws {NotFoundException} Si le morceau n'est pas trouvé.
         */
        async deleteById(id: string): Promise<void> {
            const isValid = mongoose.isValidObjectId(id);

            if (!isValid) {
                throw new BadRequestException('Entrez un ID valide.');
            }

            const deletedMorceau = await this.morceauModel.findByIdAndDelete(id);

            if (!deletedMorceau) {
                throw new NotFoundException('Morceau non trouvé');
            }

            // Remove the song from the associated album by name
            await this.albumModel.updateOne(
                { _id: deletedMorceau.album },
                { $pull: { morceaux: deletedMorceau.titre } }
            );

            // Remove the song from the associated artist
            await this.artisteModel.updateOne(
                { _id: deletedMorceau.artistes },
                { $pull: { morceaux: deletedMorceau._id } }
            );
        }

}
