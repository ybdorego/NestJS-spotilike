import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
// import { Album } from "src/album/schemas/album.schema";
// import { ArtisteAlbum } from "src/artiste-album/schemas/artisteAlbum.schema";
import { Document } from 'mongoose';



@Schema({
    timestamps: true
})

export class Artiste extends Document{

    @Prop({unique: [true, 'il y a deja un artiste de ce nom']})
    nom: string;
    
    @Prop()
    avatar: string; 

    @Prop()
    biographie: string; 

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}])
    albums: mongoose.Types.ObjectId[];

   
}

export const ArtistShema = SchemaFactory.createForClass(Artiste)

