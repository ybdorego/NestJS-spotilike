import {  IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
// import { Album } from "src/album/schemas/album.schema";

export class CreateArtisteDto{

    @IsNotEmpty()
    @IsString()
    readonly nom: string;

    @IsNotEmpty()
    @IsString()
    readonly avatar: string;

    @IsNotEmpty()
    @IsString()
    readonly biographie: string;

    // @IsEmpty()
    // @IsArray()
    // @IsOptional()
    // readonly album: Types.ObjectId[];

}