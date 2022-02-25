import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreatePostDto } from '../dtos/posts/request/create-post.dto';
import { PostsService } from '../services/posts.service';


export async function getAll(req: Request, res: Response): Promise<void> {
  const result = await PostsService.find();

  res.status(200).json(result);
};

export async function createPost(req: Request, res: Response): Promise<void> {

  const dto = plainToClass(CreatePostDto, req.body);
  await dto.isValid();

  /* const result = await PostsService.create(dto); */

  res.status(200).json('creating');
};

export async function findOne(req: Request, res: Response): Promise<void> {
  /* const result =  await PostsService.find(); */

  // Returns a list of Posts

  res.status(200).json('finding');
};

export async function updatePost(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  // Returns the Post updated

  res.status(200).json('update');
};

export async function deletePost(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  // Returns the Post updated

  res.status(200).json('update');
};