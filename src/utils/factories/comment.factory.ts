import { Prisma, PrismaClient, Comment } from '@prisma/client'
import faker from 'faker'
import { AbstractFactory } from './abstract.factory'

type CommentInput = Prisma.CommentCreateInput

export class CommentFactory extends AbstractFactory<Comment> {
    constructor(protected readonly prismaClient: PrismaClient) {
      super()
    }
    async make(input: CommentInput): Promise<Comment> {
      return this.prismaClient.comment.create({
        data: {
          ...input,
          content: input.content ?? faker.datatype.string(20),
          completed: input.completed ?? true,
          likes: input.likes ?? 0,
          dislikes: input.likes ?? 0
        },
      })
    }
    async makeMany(factorial: number, input: CommentInput): Promise<Comment[]> {
      return Promise.all([...Array(factorial)].map(() => this.make(input)))
    }
  }