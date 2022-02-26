import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// create postReaction body
@Exclude()
export class CreatePostReactionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
