import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';


export async function getAll(req: Request, res: Response): Promise<void> {
  /* const result =  await PostsService.find(); */

  // Returns a list of Posts

  res.status(200).json('finding');
};

export async function findPost(req: Request, res: Response): Promise<void> {
  /* const result =  await PostsService.find(); */

  // Returns a list of Posts

  res.status(200).json('finding');
};

export async function createPost(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  // Returns the Post created

  res.status(200).json('creating');
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