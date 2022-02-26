import { Prisma, PrismaClient, Post } from '@prisma/client'
import faker from 'faker'
import { AbstractFactory } from './abstract.factory'

type PostInput = Prisma.PostCreateInput

export class PostFactory extends AbstractFactory<Post> {
    constructor(protected readonly prismaClient: PrismaClient) {
      super()
    }
    async make(input: PostInput): Promise<Post> {
      return this.prismaClient.post.create({
        data: {
          ...input,
          content: input.content ?? faker.datatype.string(20),
          completed: input.completed ?? true,
        },
      })
    }
    async makeMany(factorial: number, input: PostInput): Promise<Post[]> {
      return Promise.all([...Array(factorial)].map(() => this.make(input)))
    }
  }