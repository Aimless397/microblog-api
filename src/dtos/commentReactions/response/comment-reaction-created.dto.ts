import { Exclude, Expose } from 'class-transformer';

// comment1Reaction created response
@Exclude()
export class CommentReactionCreatedDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly commentId: string;

  @Expose()
  readonly status: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
