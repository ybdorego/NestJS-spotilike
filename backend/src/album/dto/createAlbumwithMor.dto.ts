import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateMorceauDto } from "src/morceau/dto/create-morceau.dto";

export class CreateAlbumwithMorDto {

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
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMorceauDto)
    morceaux: CreateMorceauDto[];
}