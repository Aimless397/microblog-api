import { Exclude, Expose, Transform } from 'class-transformer';

// get posts/post response
@Exclude()
export class PostDto {
  @Expose()
  readonly uuid: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly content: string;

  @Expose()
  readonly completed: boolean;

  /*   @Expose()
    readonly likes: number;
  
    @Expose()
    readonly dislikes: number; */

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
