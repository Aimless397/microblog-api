import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../base.dto";


//create comment body
@Exclude()
export class UpdateCommentDto extends BaseDto{

    @Expose()
    @IsString()
    @IsOptional()
    readonly content?: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean;

    @Expose()
    @IsNumber()
    @IsOptional()
    readonly likes?: number;

    @Expose()
    @IsNumber()
    @IsOptional()
    readonly dislikes?: number;
}
