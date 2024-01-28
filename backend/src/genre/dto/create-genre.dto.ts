import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto{

    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}