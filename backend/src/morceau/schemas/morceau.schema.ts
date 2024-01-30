import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
// import { Genre } from "src/genre/schemas/genre.schema";


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

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Artiste"})
    // artiste: mongoose.Types.ObjectId;

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Genre"})
    // genre?: Genre;

}

export const MorceauSchema = SchemaFactory.createForClass(Morceau)