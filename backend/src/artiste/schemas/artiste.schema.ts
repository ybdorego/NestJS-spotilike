import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class Artiste {

    @Prop({required: true})
    nom: string;
    
    @Prop({required: false})
    avatar: string; 

    @Prop({required: false})
    biographie: string; 

}

export const ArtistShema = SchemaFactory.createForClass(Artiste)