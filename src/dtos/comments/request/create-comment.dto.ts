import { Exclude, Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../base.dto";


//create comment body
@Exclude()
export class CreateCommentDto extends BaseDto{
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly content:string;

    @Expose()
    @IsNotEmpty()
    readonly completed:string;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    readonly likes:string;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    readonly dislikes:string;
}
