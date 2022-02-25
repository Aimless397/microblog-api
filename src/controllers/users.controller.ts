import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { SendgridService } from '../services/sendgrid.service'

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
  res.status(200).json(message);
};

export async function verify(req: Request, res: Response): Promise<void> {

  console.log(req.params.token);

  const user = req.user as User;

  // logic for update column verify to true from user.uuid value

  res.status(200).json('verified');
}

export async function me(req: Request, res: Response): Promise<void> {

  console.log("ME");


  const user = req.user as User;
  const result = await UsersService.findOne(user.uuid);

  res.status(200).json(result);
};

export async function update(req: Request, res: Response): Promise<void> {
  /* const result =  await UsersService.find(); */

  res.status(200).json('update');
};

export async function sendEmail(req: Request, res: Response): Promise<void> {
  const token = AuthService.generateAccessToken(req.uuid as string)
  try{
    await SendgridService.sendEmail({
      to: req.email,
      subject: "Account Verification",
      html: `<strong>Token: ${token}</strong>`,
    })
  }catch (e){
    console.log(e)
  }
  
  res.status(204);
};