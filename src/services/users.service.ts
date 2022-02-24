import { Prisma } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';
import { TokenDto } from '../dtos/auth/response/token.dto';
import { UserDto } from '../dtos/users/response/user.dto';
import { prisma } from '../prisma';
import { UnprocessableEntity } from 'http-errors';
import { hashSync } from 'bcryptjs';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';

export class UsersService {
  static async find(): Promise<UserDto[]> {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

    // plainToClass
    return plainToInstance(UserDto, users);
  };

  static async create({
    password,
    ...input
  }: CreateUserDto): Promise<boolean> {
    /* }: CreateUserDto): Promise<TokenDto> { */
    const userFound = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
      rejectOnNotFound: false
    });

    if (userFound) {
      throw new UnprocessableEntity('Email already taken');
    }

    const user = await prisma.user.create({
      data: {
        ...input,
        password: hashSync(password, 10)
      }
    });


    const token = await AuthService.createToken(user.uuid);
    const tokenCreated = AuthService.generateAccessToken(token.jti);
    // send email with tokenCreated
    // http://localhost:3000/api/v1/users/verify/:token



    return true;
  }

  static async findOne(uuid: string): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { uuid } });

    return plainToClass(UserDto, user);
  }
}
