import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Morceau {

    @Prop()
    titre: string;

    @Prop()
    duree: string; 

}

export const MorceauSchema = SchemaFactory.createForClass(Morceau)