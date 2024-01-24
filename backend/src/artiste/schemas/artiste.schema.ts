import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class Artiste {

    @Prop()
    nom: string;
    
    @Prop()
    avatar: string; 

    @Prop()
    biographie: string; 

}

export const ArtistShema = SchemaFactory.createForClass(Artiste)