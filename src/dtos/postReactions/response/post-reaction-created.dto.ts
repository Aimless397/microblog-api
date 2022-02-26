import { Exclude, Expose } from 'class-transformer';

// postReaction created response
@Exclude()
export class PostReactionCreatedDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly postId: string;

  @Expose()
  readonly status: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
