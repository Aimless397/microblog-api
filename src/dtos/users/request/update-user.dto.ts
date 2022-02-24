import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// body for updating user
@Exclude()
export class UpdateUserDto extends BaseDto {
  @Expose()
  @IsEmail()
  readonly email?: string

  @Expose()
  @IsString()
  @Length(5, 20)
  readonly password?: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly firstName?: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly lastName?: string

  @Expose()
  @IsNotEmpty()
  readonly public?: boolean

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly role?: string

  @Expose()
  @IsNotEmpty()
  readonly emailPublic?: boolean

  @Expose()
  @IsNotEmpty()
  readonly namePublic?: boolean

  @Expose()
  @IsNotEmpty()
  readonly verified?: boolean
}
