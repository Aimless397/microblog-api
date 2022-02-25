import { Exclude, Expose, Transform } from 'class-transformer';

// get posts response
@Exclude()
export class PostDto {
  @Expose()
  readonly uuid: string

  @Expose()
  readonly email: string

  @Expose()
  readonly firstName: string

  @Expose()
  readonly lastName: string

  @Expose()
  readonly public: boolean

  @Expose()
  readonly role: string

  @Expose()
  readonly emailPublic: boolean

  @Expose()
  readonly namePublic: boolean

  @Expose()
  readonly verified: boolean

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
