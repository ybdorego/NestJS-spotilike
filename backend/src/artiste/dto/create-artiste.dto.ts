// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {  IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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