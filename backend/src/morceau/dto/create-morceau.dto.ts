import {IsNotEmpty, IsString } from 'class-validator'
export class CreateMorceauDto{

    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly duree: string;
}