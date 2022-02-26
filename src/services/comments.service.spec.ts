import { Comment } from '@prisma/client'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import 'jest-extended/all'
import { plainToClass } from 'class-transformer'
import { UnprocessableEntity, NotFound } from 'http-errors'
import { clearDatabase, prisma } from '../prisma'
import { CommentFactory } from '../utils/factories/comment.factory'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { CommentsService } from './comments.service'
import { AuthService } from './auth.service'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { PostFactory } from '../utils/factories/post.factory'
import { CommentCreatedDto } from '../dtos/comments/response/comment-created.dto'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('CommentsService', () => {

  let commentFactory: CommentFactory
  let postFactory: PostFactory
  let comments: Comment[]

  beforeAll(() => {
    commentFactory = new CommentFactory(prisma)
    postFactory = new PostFactory(prisma)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('findByPost', () => {
    
    it('should return a list of comments', async () => {

      const content = "lorem"  
      const post = await postFactory.make({content,"completed": true,"likes":0,"user":'1',"dislikes":0})
      comments = await commentFactory.makeMany(5,)

      const result = await CommentsService.findByPost()

      expect(result.length).toBe(users.length)
    })
  })

  describe('create', () => {
    it('should throw an error if the user already exists', async () => {
      const email = faker.internet.email()
      await userFactory.make({ email })
      const data = plainToClass(CreateUserDto, {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        password: faker.internet.password(6),
        verified: false
      })

      await expect(UsersService.create(data)).rejects.toThrowError(
        new UnprocessableEntity('email already taken'),
      )
    })

    it('should create a new user', async () => {
      const spyCreateToken = jest.spyOn(AuthService, 'createToken')
      const spySendEmail = jest.spyOn(SendgridService, 'sendEmail')
      const generateAccessToken = jest.spyOn(AuthService, 'generateAccessToken')
      const data = plainToClass(CreateUserDto, {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        verified: false
      })

      const result = await UsersService.create(data)

      expect(spyCreateToken).toHaveBeenCalledOnce()
      expect(spySendEmail).toHaveBeenCalledOnce()
      expect(generateAccessToken).toHaveBeenCalledOnce()
      expect(result).toBeTrue()
    })
  })
})
