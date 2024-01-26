import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto{
    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly pochette: string;

    @IsNotEmpty()
    @IsDate()
    readonly dateSortie: Date;
}