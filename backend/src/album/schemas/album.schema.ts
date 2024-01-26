import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Artiste } from "src/artiste/schemas/artiste.schema";
import { Genre } from "src/genre/schemas/genre.schema";
import { Morceau } from "src/morceau/schemas/morceau.schema";


@Schema({
    timestamps: true
})

export class Album {

    @Prop()
    titre: string;
    
    @Prop()
    pochette: string; 

    @Prop()
    dateSortie: Date; 

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Morceau"})
    morceau?: Morceau;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Artiste"})
    artiste?: Artiste;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Genre"})
    genre?: Genre;


}

export const AlbumSchema = SchemaFactory.createForClass(Album)