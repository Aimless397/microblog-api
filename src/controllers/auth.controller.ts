import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { LoginDto } from '../dtos/auth/request/login.dto';
import { AuthService } from '../services/auth.service';

/* export async function signup(req: Request, res: Response) {

  res.status(200).send("signup")
} */

export async function login(req: Request, res: Response) {
  const dto = plainToClass(LoginDto, req.body);
  await dto.isValid();

  const result = await AuthService.login(dto);

  res.status(200).json(result);
}

export async function logout(req: Request, res: Response) {
  const accessToken = req.headers.authorization?.replace('Bearer', '');

  await AuthService.logout(accessToken);

  res.status(200).json('Logged out');
}