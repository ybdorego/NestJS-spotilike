import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { CreateMorceauDto } from "src/morceau/dto/create-morceau.dto";

@Schema({
    timestamps: true
})

export class Album extends Document{

    @Prop({unique: [true, 'il y a deja un album a ce titre']})
    titre: string;
    
    @Prop({ required: true })
    pochette: string; 

    @Prop({ required: true })
    dateSortie: Date; 

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Artiste'}])
    artiste: mongoose.Types.ObjectId[];
    
    @Prop( [CreateMorceauDto])
    morceaux: CreateMorceauDto[];

}

export const AlbumSchema = SchemaFactory.createForClass(Album)