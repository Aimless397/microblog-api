import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// create commentReaction body
@Exclude()
export class CreateCommentReactionDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly commentId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
