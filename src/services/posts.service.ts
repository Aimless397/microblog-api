import { PostReaction, Prisma } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';
import { prisma } from '../prisma';
import { UnprocessableEntity, NotFound } from 'http-errors';
import { PrismaErrorEnum } from '../utils/enums';
import { PostDto } from '../dtos/posts/response/post.dto';
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { PostCreatedDto } from '../dtos/posts/response/post-created.dto';
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto';
import { CreatePostReactionDto } from '../dtos/postReactions/request/create-post-reaction.dto';
import { PostReactionCreatedDto } from '../dtos/postReactions/response/post-reaction-created.dto';

export class PostsService {
  static async find(
    offset: number,
    limit: number
  ): Promise<PostDto[]> {

    const posts = await prisma.post.findMany({ skip: offset, take: limit, orderBy: { createdAt: 'desc' } });

    // plainToClass
    return plainToInstance(PostDto, posts);
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
  };

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
      
      let throwable = error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code == PrismaErrorEnum.NOT_FOUND){
          throwable = new NotFound('Post not found');
        }
      }
      throw throwable;
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
      let throwable = error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throwable = new NotFound('Post not found');
        }
      }

      throw throwable;
    }
  };

  static async findPostReaction(
    postId: string,
    userId: string
  ): Promise<PostReaction[]> {
    const postReactionFound = await prisma.postReaction.findMany({
      where: {
          postId,
          userId
      }
    });
    return postReactionFound;
   
  };

  static async createReaction(
    userId: string,
    { ...input }: CreatePostReactionDto
  ): Promise<PostReactionCreatedDto> {
    const postReaction = await prisma.postReaction.create({
      data: {
        ...input,
        userId: userId
      }
    });

    return postReaction;
  };

  static async updateReaction(
    uuid: string,
    status: string
  ): Promise<PostReactionCreatedDto> {
    try {
      const postReactionUpdated = await prisma.postReaction.update({
        data: {
          status
        },
        where: {
          uuid
        }
      });

      return postReactionUpdated;
    } catch (error) {
      let throwable = error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throwable = new NotFound('Post Reaction not found');
        }
      }
      throw throwable;
    }
  };
}
