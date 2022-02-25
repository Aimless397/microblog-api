import { Prisma } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDto } from '../dtos/users/response/user.dto';
import { prisma } from '../prisma';
import { UnprocessableEntity, NotFound } from 'http-errors';
import { hashSync } from 'bcryptjs';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { UpdateUserDto } from '../dtos/users/request/update-user.dto';
import { PrismaErrorEnum } from '../utils/enums';
import { PasswordRecoveryDto } from '../dtos/users/request/password-recovery.dto';
import { PostDto } from '../dtos/posts/response/post.dto';

export class PostsService {
  static async find(): Promise<PostDto[]> {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

    // plainToClass
    return plainToClass(PostDto, posts);
  };

  /*  static async create({
     password,
     ...input
   }: CreateUserDto): Promise<boolean> {
     const userFound = await prisma.user.findUnique({
       where: { email: input.email },
       select: { id: true },
       rejectOnNotFound: false
     });
 
     if (userFound) {
       throw new UnprocessableEntity('Email already taken');
     }
 
     const user = await prisma.user.create({
       data: {
         ...input,
         password: hashSync(password, 10)
       }
     });
 
     return true;
   }; */

  static async findOne(uuid: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { uuid } });

    return plainToClass(UserDto, user);
  };

  static async update(
    uuid: string,
    { password, ...input }: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user = await prisma.user.update({
        data: {
          ...input,
          ...(password && { password: hashSync(password, 10) })
        },
        where: {
          uuid
        }
      })

      return plainToClass(UserDto, user)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throw new NotFound('User not found')
          case PrismaErrorEnum.DUPLICATED:
            throw new UnprocessableEntity('email already taken')
          default:
            throw error;
        }
      }

      throw error;
    }
  };

  static async passwordRecovery(
    uuid: string,
    { email, password, passwordRepeated }: PasswordRecoveryDto
  ): Promise<void> {
    try {

      // TODO: Password change logic

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throw new NotFound('User not found')
          case PrismaErrorEnum.DUPLICATED:
            throw new UnprocessableEntity('email already taken')
          default:
            throw error;
        }
      }

      throw error;
    }
  };
}