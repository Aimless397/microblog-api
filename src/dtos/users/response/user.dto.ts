import { Exclude, Expose, Transform } from 'class-transformer'

// response for getting users
@Exclude()
export class UserDto {
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
}
