import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto{
    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly pochette: string;

    @IsNotEmpty()
    @IsString()
    // @IsDate()
    readonly dateSortie: string;

    // @IsString()
    // @IsNotEmpty()
    // readonly artisteId: string;
}