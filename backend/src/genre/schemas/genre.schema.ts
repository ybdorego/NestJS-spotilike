import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Genre {

    @Prop()
    titre: string;

    @Prop()
    description: string; 

}

export const GenreSchema = SchemaFactory.createForClass(Genre)