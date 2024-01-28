import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Genre {

    @Prop({required: true})
    titre: string;

    @Prop({required: false})
    description: string; 

}

export const GenreSchema = SchemaFactory.createForClass(Genre)