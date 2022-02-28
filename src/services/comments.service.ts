import { prisma } from "../prisma";
import { CommentDto } from "../dtos/comments/response/comment.dto";
import { plainToInstance } from "class-transformer";
import { UpdateUserDto } from "../dtos/users/request/update-user.dto";
import { UpdateCommentDto } from "../dtos/comments/request/update-comment.dto";
import { CommentReaction, Prisma } from "@prisma/client";
import { PrismaErrorEnum } from "../utils/enums";
import { NotFound } from 'http-errors';
import { CreateCommentDto } from "../dtos/comments/request/create-comment.dto";
import { CommentCreatedDto } from "../dtos/comments/response/comment-created.dto";
import { CreateCommentReactionDto } from "../dtos/commentReactions/request/create-comment-reaction.dto";
import { CommentReactionCreatedDto } from "../dtos/commentReactions/response/comment-reaction-created.dto";

export class CommentsService {
  static async find(
    offset: number,
    limit: number
  ): Promise<CommentDto[]> {
    const comments = await prisma.comment.findMany({ skip: offset, take: limit, orderBy: { createdAt: 'desc' } });

    return plainToInstance(CommentDto, comments);
  };

  static async create(
    userId: string, {
      ...input
    }: CreateCommentDto): Promise<CommentCreatedDto> {
    const comment = await prisma.comment.create({
      data: {
        ...input,
        userId: userId,
      }
    });

    return comment;
  };

  static async findByUserId(uuid: string, commentId: string): Promise<CommentDto[]> {
    const comment = await prisma.comment.findMany({ where: { uuid: commentId, userId: uuid } });

    return plainToInstance(CommentDto, comment);
  }

  static async findOne(uuid: string): Promise<CommentDto> {
    const comment = await prisma.comment.findUnique({ where: { uuid } });

    return plainToInstance(CommentDto, comment)
  };

  static async update(
    uuid: string, {
      ...input
    }: UpdateCommentDto): Promise<CommentDto> {
    try {
      const comment = await prisma.comment.update({
        data: {
          ...input
        },
        where: {
          uuid
        }
      });

      return plainToInstance(CommentDto, comment)
    } catch (error) {
      let throwable = error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if(error.code == PrismaErrorEnum.NOT_FOUND){
          throwable = new NotFound('Comment not found');
        }
      }
      throw throwable;
    }
  };

  static async remove(
    uuid: string,
  ): Promise<CommentDto> {
    try {
      const comment = await prisma.comment.delete({
        where: {
          uuid
        }
      });

      return comment;
    } catch (error) {
      let throwable = error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throwable = new NotFound('Comment not found');
        }
      }
      throw throwable;
    }
  };

  static async findCommentReaction(
    commentId: string,
    userId: string
  ): Promise<CommentReaction[]> {
    const commentReactionFound = await prisma.commentReaction.findMany({
      where: {
        commentId,
        userId
      }
    });
    return commentReactionFound;
  };

  static async createReaction(
    userId: string,
    { ...input }: CreateCommentReactionDto
  ): Promise<CommentReactionCreatedDto> {
    const commentReaction = await prisma.commentReaction.create({
      data: {
        ...input,
        userId: userId
      }
    });

    return commentReaction;
  };



  static async updateReaction(
    uuid: string,
    status: string
  ): Promise<CommentReactionCreatedDto> {
    try {
      const commentReactionUpdated = await prisma.commentReaction.update({
        data: {
          status
        },
        where: {
          uuid
        }
      });

      return commentReactionUpdated;
    } catch (error) {
      let throwable = error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.NOT_FOUND:
            throwable = new NotFound('Comment Reaction not found');
        }
      }
      throw throwable;
    }
  };
}