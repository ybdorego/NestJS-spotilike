import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAlbumDto{
    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly pochette: string;

    @IsNotEmpty()
    @IsString()
    readonly dateSortie: Date;
}