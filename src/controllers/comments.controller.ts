import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateCommentReactionDto } from '../dtos/commentReactions/request/create-comment-reaction.dto';
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto';
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto';
import { CommentReactionDto } from '../dtos/commentReactions/response/comment-reaction.dto';
import { CreatePostReactionDto } from '../dtos/postReactions/request/create-post-reaction.dto';
import { PostReactionDto } from '../dtos/postReactions/response/post-reaction.dto';
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto';
import { CommentsService } from '../services/comments.service';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';


export async function findComments(req: Request, res: Response): Promise<void> {

  const { page, limit } = req.query;

  let limitNumber = parseInt(limit as string);
  const offset = parseInt(page as string) * limitNumber;
  const result = await CommentsService.find(offset, limitNumber);

  res.status(200).json(result);
};

export async function createComment(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const { content, completed } = req.body;
  const dto = plainToClass(CreateCommentDto, { postId: req.params.id, content, completed });

  await dto.isValid();

  const result = await CommentsService.create(uuid, dto);

  res.status(200).json(result);
};

export async function updateComment(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const { id: postId, commentId } = req.params;
  const dto = plainToClass(UpdateCommentDto, req.body);
  await dto.isValid();

  const comment = await CommentsService.findOne(commentId);

  if (comment.userId !== uuid) {
    res.status(403).json({ message: `Comment doesn't belong to user` });
  }

  const result = await CommentsService.update(commentId, dto);

  res.status(200).json(result);
};

export async function removeComment(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;

  const validUser = await CommentsService.findByUserId(uuid, req.params.commentId);
  const user = await UsersService.findOne(uuid);

  if (!validUser.length && user.role !== "moderator") {
    res.status(403).json({ message: `Comment doesn't belong to user` });
  } else {
    await CommentsService.remove(req.params.commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  }
};

export async function commentReaction(req: Request, res: Response): Promise<void> {
  const { commentId, reaction } = req.params;
  const { uuid } = req.user as User;
  const dto = plainToClass(CreateCommentReactionDto, { userId: uuid, commentId, status: reaction });
  const validReactions = ['L', 'D', 'N'];

  if (validReactions.includes(reaction)) {
    const reactionExists = await CommentsService.findCommentReaction(commentId, uuid);

    let result: CommentReactionDto = {};

    if (reactionExists.length) {
      result = await CommentsService.updateReaction(reactionExists[0].uuid, reaction);
    } else {
      result = await CommentsService.createReaction(uuid, dto);
    }

    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Invalid reaction' });
  }
}
