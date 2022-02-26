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
          userId: input.uuid,
          content: input.content ?? faker.datatype.string(20),
          completed: input.completed ?? true,
          likes: input.likes ?? 0,
          dislikes: input.likes ?? 0
        },
      })
    }
    async makeMany(factorial: number, input: PostInput): Promise<Post[]> {
      return Promise.all([...Array(factorial)].map(() => this.make(input)))
    }
  }