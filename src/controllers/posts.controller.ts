import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreatePostReactionDto } from '../dtos/postReactions/request/create-post-reaction.dto';
import { PostReactionDto } from '../dtos/postReactions/response/post-reaction.dto';
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';


export async function find(req: Request, res: Response): Promise<void> {

  const { page, limit } = req.query;

  let limitNumber = parseInt(limit as string);
  const offset = parseInt(page as string) * limitNumber;
  const result = await PostsService.find(offset, limitNumber);

  res.status(200).json(result);
};

export async function create(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const dto = plainToClass(CreatePostDto, req.body);

  await dto.isValid();

  const result = await PostsService.create(uuid, dto);

  res.status(200).json(result);
};

export async function findOne(req: Request, res: Response): Promise<void> {
  const result = await PostsService.findOne(req.params.id);

  res.status(200).json(result);
};

export async function update(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const dto = plainToClass(UpdatePostDto, req.body);
  await dto.isValid();

  const validUser = await PostsService.findByUserId(uuid, req.params.id);

  if (!validUser.length) {
    res.status(403).json({ message: `Post doesn't belong to user` });
  }

  const result = await PostsService.update(req.params.id, dto);

  res.status(200).json(result);
};

export async function remove(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;

  const validUser = await PostsService.findByUserId(uuid, req.params.id);
  const user = await UsersService.findOne(uuid);

  if (!validUser.length && user.role !== "moderator") {
    res.status(403).json({ message: `Post doesn't belong to user` });
  } else {
    await PostsService.remove(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  }
};

export async function reaction(req: Request, res: Response): Promise<void> {
  const { id, reaction } = req.params;
  const { uuid } = req.user as User;
  const dto = plainToClass(CreatePostReactionDto, { userId: uuid, postId: id, status: reaction });
  const validReactions = ['L', 'D', 'N'];

  if (validReactions.includes(reaction)) {
    const reactionExists = await PostsService.findPostReaction(id, uuid);

    let result: PostReactionDto = {};

    if (reactionExists.length) {

      console.log(reactionExists[0].uuid, reaction);

      console.log("updating");

      result = await PostsService.updateReaction(reactionExists[0].uuid, reaction);

      console.log("result: ", result);

    } else {
      console.log("creating");
      result = await PostsService.createReaction(uuid, dto);
    }

    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Invalid reaction' });
  }
}
