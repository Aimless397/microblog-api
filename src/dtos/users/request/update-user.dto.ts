import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// update user body
@Exclude()
export class UpdateUserDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @Expose()
  @IsString()
  @Length(5, 20)
  @IsOptional()
  readonly password?: string

  @Expose()
  @IsString()
  @IsOptional()
  readonly firstName?: string

  @Expose()
  @IsString()
  @IsOptional()
  readonly lastName?: string

  @Expose()
  @IsOptional()
  readonly public?: boolean

  @Expose()
  @IsString()
  @IsOptional()
  readonly role?: string

  @Expose()
  @IsOptional()
  readonly emailPublic?: boolean

  @Expose()
  @IsOptional()
  readonly namePublic?: boolean

  @Expose()
  @IsOptional()
  readonly verified?: boolean
}
