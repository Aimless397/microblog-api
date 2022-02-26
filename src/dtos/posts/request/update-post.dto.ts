import { Expose, Exclude } from 'class-transformer'
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// update post body
@Exclude()
export class UpdatePostDto extends BaseDto {
  @Expose()
  @IsOptional()
  readonly userId?: string;

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
