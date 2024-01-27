import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Artiste } from "src/artiste/schemas/artiste.schema";
import { Morceau } from "src/morceau/schemas/morceau.schema";

@Schema({
    timestamps: true
})

export class ArtisteMorceau extends Document {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Artiste"})
    artiste: Artiste;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Morceau"})
    morceau: Morceau;


}

export const ArtisteMorceauShema = SchemaFactory.createForClass(ArtisteMorceau)