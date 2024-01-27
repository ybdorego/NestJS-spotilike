import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "src/album/schemas/album.schema";;
import { Morceau } from "src/morceau/schemas/morceau.schema";

@Schema({
    timestamps: true
})

export class AlbumMorceau extends Document {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Album"})
    album: Album;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Morceau"})
    morceau: Morceau;


}

export const AlbumMorceauShema = SchemaFactory.createForClass(AlbumMorceau)