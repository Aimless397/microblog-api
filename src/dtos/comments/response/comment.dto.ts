import { Exclude, Expose } from 'class-transformer';

// get comment response
@Exclude()
export class CommentDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly postId: string;

  @Expose()
  readonly content: string;

  @Expose()
  readonly completed: boolean;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
