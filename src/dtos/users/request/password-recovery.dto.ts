import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { BaseDto } from '../../base.dto'

// recovery password body
@Exclude()
export class PasswordRecoveryDto extends BaseDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Expose()
  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  readonly password: string;

  @Expose()
  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  readonly passwordRepeated: string;
}
