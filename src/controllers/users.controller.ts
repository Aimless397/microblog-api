import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { UsersService } from '../services/users.service';

export async function find(req: Request, res: Response): Promise<void> {
  const result = await UsersService.find();

  res.status(200).json(result);
};

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateUserDto, req.body);
  await dto.isValid();

  const result = await UsersService.create(dto);

  res.status(200).json(result);
};

export async function me(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('me');
};

export async function update(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('update');
};