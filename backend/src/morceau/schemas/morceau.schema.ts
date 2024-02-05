import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";



@Schema({
    timestamps: true
})

export class Morceau {

    @Prop({required: true})
    titre: string;

    @Prop({required: true})
    duree: string; 

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Artiste'}])
    artistes: mongoose.Types.ObjectId[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Genre"})
    genre: mongoose.Types.ObjectId[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Album"})
    album: mongoose.Types.ObjectId;

}

export const MorceauSchema = SchemaFactory.createForClass(Morceau)