import { Exclude, Expose, Transform } from 'class-transformer';

// get comments/comment response
@Exclude()
export class CommentReactionDto {
  @Expose()
  readonly uuid?: string;

  @Expose()
  readonly userId?: string;

  @Expose()
  readonly commentId?: string;

  @Expose()
  readonly status?: string;

  @Expose()
  readonly createdAt?: Date;

  @Expose()
  readonly updatedAt?: Date;
}
