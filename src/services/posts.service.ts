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
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { PostCreatedDto } from '../dtos/posts/response/post-created.dto';
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto';

export class PostsService {
  static async find(): Promise<PostDto[]> {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

    // plainToClass
    return plainToClass(PostDto, posts);
  };

  static async create(
    uuid: string, {
      ...input
    }: CreatePostDto): Promise<PostCreatedDto> {
    const post = await prisma.post.create({
      data: {
        ...input,
        userId: uuid
      }
    });

    return post;
  };

  static async findOne(uuid: string): Promise<PostDto> {
    const post = await prisma.post.findUnique({ where: { uuid } });

    return plainToClass(PostDto, post);
  };

  static async findByUserId(uuid: string, postId: string): Promise<PostDto[]> {
    const post = await prisma.post.findMany({ where: { uuid: postId, userId: uuid } });

    return plainToInstance(PostDto, post);
  }

  static async update(
    postId: string,
    { ...input }: UpdatePostDto,
  ): Promise<PostDto> {
    try {
      const post = await prisma.post.update({
        data: {
          ...input,
        },
        where: {
          uuid: postId
        }
      });

      return plainToClass(PostDto, post);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throw new NotFound('Post not found');
          default:
            throw error;
        }
      }

      throw error;
    }
  };

  static async remove(
    postId: string,
  ): Promise<PostDto> {
    try {
      const post = await prisma.post.delete({
        where: {
          uuid: postId
        }
      });

      return post;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throw new NotFound('Post not found');
          default:
            throw error;
        }
      }

      throw error;
    }
  };

  /* static async reaction(

  ): Promise<boolean> {
    try {

      return true;
    } catch (error) {

    }
  }; */
}
