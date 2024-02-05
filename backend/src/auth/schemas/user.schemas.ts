import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

    @Prop({unique: [true, 'il y a deja utilisateur avec ce nom d\'utilisateur']})
    nom: string;
    
    @Prop({unique: [true, 'duplicate email']})
    email: string; 

    @Prop({ required: true })
    password: string; 


}

export const UserSchema = SchemaFactory.createForClass(User)