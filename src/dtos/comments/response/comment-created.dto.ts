import { Exclude, Expose } from 'class-transformer';

// create comment response
@Exclude()
export class CommentCreatedDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly content: string;

  @Expose()
  readonly completed: boolean;

  @Expose()
  readonly likes: number;

  @Expose()
  readonly dislikes: number;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
