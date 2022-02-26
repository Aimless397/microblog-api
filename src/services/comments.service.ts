import { prisma } from "../prisma";
import { CommentDto } from "../dtos/comments/response/comment.dto";
import { plainToInstance } from "class-transformer";

export class CommentsService{

    static async create(){

    }
    
    static async findByPost(postId:string): Promise<CommentDto[]>{
        const comments = await prisma.comment.findMany({ where:{ postId } });

        return plainToInstance(CommentDto, comments)
    }

    static async findOne(uuid:string): Promise<CommentDto>{
        const comment = await prisma.comment.findUnique({ where:{ uuid } });

        return plainToInstance(CommentDto, comment)
    }

    static async update(){

    }

    static async remove(){

    }
    

}