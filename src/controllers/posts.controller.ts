import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto';
import { PostsService } from '../services/posts.service';


export async function find(req: Request, res: Response): Promise<void> {
  const result = await PostsService.find();

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

  if (!validUser.length) {
    res.status(403).json({ message: `Post doesn't belong to user` });
  }

  await PostsService.remove(req.params.id);

  res.status(200).json({ message: 'Post deleted successfully' });
};

export async function reaction(req: Request, res: Response): Promise<void> {

  res.status(200).json();
}