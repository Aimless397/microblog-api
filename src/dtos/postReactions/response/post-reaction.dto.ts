import { Exclude, Expose, Transform } from 'class-transformer';

// get posts/post response
@Exclude()
export class PostReactionDto {
  @Expose()
  readonly uuid?: string;

  @Expose()
  readonly userId?: string;

  @Expose()
  readonly postId?: string;

  @Expose()
  readonly status?: string;

  @Expose()
  readonly createdAt?: Date;

  @Expose()
  readonly updatedAt?: Date;
}
