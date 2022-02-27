import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// create post body
@Exclude()
export class CreatePostDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @Expose()
  @IsNotEmpty()
  readonly completed: boolean;
}
