import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


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

}

export const AlbumSchema = SchemaFactory.createForClass(Album)