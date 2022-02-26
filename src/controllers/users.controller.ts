import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { PasswordRecoveryDto } from '../dtos/users/request/password-recovery.dto';
import { UpdateUserDto } from '../dtos/users/request/update-user.dto';
import { UsersService } from '../services/users.service';
import jwt from 'jsonwebtoken';

export async function find(req: Request, res: Response): Promise<void> {
  const result = await UsersService.find();

  res.status(200).json(result);
};

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateUserDto, req.body);
  await dto.isValid();

  const result = await UsersService.create(dto);

  const message = 'Please verify the user email';

  /* res.status(200).json(result); */
  res.status(200).json({ message });
};

export async function verify(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateUserDto, { verified: true });
  await dto.isValid();

  const payload = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY || 'tokentest');

  console.log("PAYLOAD: ", payload);

  const userId = await UsersService.getUuidFromToken(payload.sub as string);

  const result = await UsersService.update(userId, dto);

  // TODO: logic for update column verify to true from user.uuid value

  res.status(200).render('verifyEmailScreen');
}

export async function me(req: Request, res: Response): Promise<void> {
  const user = req.user as User;
  const result = await UsersService.findOne(user.uuid);

  res.status(200).json(result);
};

export async function update(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const dto = plainToClass(UpdateUserDto, req.body);
  await dto.isValid();

  const result = await UsersService.update(uuid, dto);

  res.status(200).json(result);
};

export async function passwordRecovery(req: Request, res: Response): Promise<void> {
  const { uuid } = req.user as User;
  const dto = plainToClass(PasswordRecoveryDto, req.body);
  await dto.isValid();
  const result = await UsersService.passwordRecovery(uuid, dto);

  res.status(200).json('update');
};