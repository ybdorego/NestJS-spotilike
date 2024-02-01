import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMorceauDto{

    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly duree: string;
}