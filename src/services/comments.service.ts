import { prisma } from "../prisma";
import { CommentDto } from "../dtos/comments/response/comment.dto";
import { plainToInstance } from "class-transformer";
import { UpdateUserDto } from "../dtos/users/request/update-user.dto";
import { UpdateCommentDto } from "../dtos/comments/request/update-comment.dto";
import { Prisma } from "@prisma/client";
import { PrismaErrorEnum } from "../utils/enums";
import {  NotFound } from 'http-errors';
import { CreateCommentDto } from "../dtos/comments/request/create-comment.dto";

export class CommentsService{

    static async create(userId: string,{...input}:CreateCommentDto){
        
        try {
            await prisma.comment.create({
                data: {
                    ...input,
                    userId: userId,
                }
            })
        } catch (error) {
            
        }

    }
    
    static async findByPost(postId:string): Promise<CommentDto[]>{
        const comments = await prisma.comment.findMany({ where:{ postId } });

        return plainToInstance(CommentDto, comments)
    }

    static async findOne(uuid:string): Promise<CommentDto>{
        const comment = await prisma.comment.findUnique({ where:{ uuid } });

        return plainToInstance(CommentDto, comment)
    }

    static async update(uuid: string, {...input}: UpdateCommentDto): Promise<CommentDto>{
        try{
            const comment = await prisma.comment.update({
                data: {
                    ...input
                },
                where:{
                    uuid
                }
            })
            return plainToInstance(CommentDto, comment)
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code == PrismaErrorEnum.NOT_FOUND){
                    throw new NotFound('Comment not Found')
                }
            }
            throw error
        }
    }

    static async remove(
        commentId: string,
      ): Promise<CommentDto> {
        try {
          const post = await prisma.post.delete({
            where: {
              uuid: commentId
            }
          });
    
          return post;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
              case PrismaErrorEnum.NOT_FOUND:
                throw new NotFound('Comment not found');
              default:
                throw error;
            }
          }
          throw error;
        }
      };
    

}