import { Prisma, Token } from '@prisma/client';
import { compareSync } from 'bcryptjs'
import { Unauthorized, NotFound } from 'http-errors'
import { LoginDto } from '../dtos/auth/request/login.dto';
import { TokenDto } from '../dtos/auth/response/token.dto';
import { prisma } from '../prisma';
import { verify, sign } from 'jsonwebtoken';
import { PrismaErrorEnum } from '../utils/enums';

export class AuthService {
  static async login(input: LoginDto): Promise<TokenDto> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      rejectOnNotFound: false
    });

    if (!user) {
      throw new Unauthorized('Invalid credentials');
    }

    const isValid = compareSync(input.password, user.password);

    if (!isValid) {
      throw new Unauthorized('Invalid credentials');
    }

    const token = await this.createToken(user.uuid);
    const tokenGenerated = this.generateAccessToken(token.jti);

    return tokenGenerated;
  }

  static async createToken(uuid: string): Promise<Token> {
    try {
      const token = await prisma.token.create({
        data: {
          userId: uuid,
        },
      })

      return token;
    } catch (error) {
      let throwable = error

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorEnum.FOREIGN_KEY_CONSTRAINT:
            throwable = new NotFound('User not found');
        }
      }

      throw throwable;
    }
  }

  static async logout(accessToken?: string): Promise<boolean> {
    if (!accessToken) return false

    try {
      const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY as string)

      await prisma.token.delete({ where: { jti: sub as string } })
      return true
    } catch (error) {
      console.error(error)
    }
    return false
  }

  static generateAccessToken(sub: string): TokenDto {
    const now = new Date().getTime()
    const exp = Math.floor(
      new Date(now).setSeconds( parseInt(process.env.JWT_EXPIRATION_TIME as string, 10)) / 1000
    );
    const iat = Math.floor(now / 1000);

    const accessToken = sign(
      {
        sub,
        iat,
        exp,
      },
      process.env.JWT_SECRET_KEY as string
    )

    return {
      accessToken,
      exp
    }
  }
}