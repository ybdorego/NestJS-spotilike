import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "src/album/schemas/album.schema";
import { Artiste } from "src/artiste/schemas/artiste.schema";
import { Document } from 'mongoose';



@Schema({
    timestamps: true
})

export class ArtisteAlbum extends Document {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Artiste"})
    artiste: Artiste;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Album"})
    album: Album;

}

export const ArtisteAlbumShema = SchemaFactory.createForClass(ArtisteAlbum)