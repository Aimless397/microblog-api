import { Prisma, Token } from '@prisma/client';
import { compareSync } from 'bcryptjs'
import { Unauthorized } from 'http-errors'
import { LoginDto } from '../dtos/auth/request/login.dto';
import { TokenDto } from '../dtos/auth/response/token.dto';
import { prisma } from '../prisma'

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

    const token = await this.createToken(user.id);

    return this.generateAccessToken(token.jti);
  }

  static async createToken(userId: string): Promise<Token> {
    try {
      const token = await prisma.token.create({
        data: {
          userId,
        },
      })

      return token;
    } catch (error) {
      throw new Error('User not found');
    }
  }

  static async logout(accessToken?: string): Promise<void> {
    if (!accessToken) return

    try {
      const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY as string)

      await prisma.token.delete({ where: { jti: sub as string } })
    } catch (error) {
      throw error;
    }
  }

  static generateAccessToken(sub: string): TokenDto {
    const now = new Date().getTime()
    const exp = Math.floor(
      new Date(now).setSeconds(
        parseInt(process.env.JWT_EXPIRATION_TIME as string, 10),
      ) / 1000,
    )
    const iat = Math.floor(now / 1000)

    const accessToken = sign(
      {
        sub,
        iat,
        exp,
      },
      process.env.JWT_SECRET_KEY as string,
    )

    return {
      accessToken,
      exp,
    }
  }
}