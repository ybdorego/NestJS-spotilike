import { IsNotEmpty, IsString } from "class-validator";

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
}