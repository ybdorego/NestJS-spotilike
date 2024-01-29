import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
// import mongoose from "mongoose";
// import { Artiste } from "src/artiste/schemas/artiste.schema";
// import { Genre } from "src/genre/schemas/genre.schema";
// import { Morceau } from "src/morceau/schemas/morceau.schema";


@Schema({
    timestamps: true
})

export class Album extends Document{

    @Prop({ required: true })
    titre: string;
    
    @Prop({ required: true })
    pochette: string; 

    @Prop({ required: true })
    dateSortie: Date; 

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Artiste"})
    artiste: mongoose.Types.ObjectId;

}

export const AlbumSchema = SchemaFactory.createForClass(Album)