import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

export async function find(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('finding');
};

export async function create(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('creating');
};

export async function me(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('me');
};

export async function update(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('update');
};