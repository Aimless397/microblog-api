import { User, Post } from '@prisma/client'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import 'jest-extended/all'
import { plainToClass } from 'class-transformer'
import { UnprocessableEntity, NotFound } from 'http-errors'
import { CreateUserDto } from '../dtos/users/request/create-user.dto'
import { clearDatabase, prisma } from '../prisma'
import { UserFactory } from '../utils/factories/user.factory'
import { UpdateUserDto } from '../dtos/users/request/update-user.dto'
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { PostsService } from './posts.service'
import { SendgridService } from './sendgrid.service'
import { TokenFactory } from '../utils/factories/token.factory'
import { PostFactory } from '../utils/factories/post.factory'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { hashSync } from 'bcryptjs'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('UserService', () => {

  let userFactory: UserFactory;
  let postFactory: PostFactory;
  let tokenFactory: TokenFactory;
  let userSample: CreateUserDto;
  let users: User[];
  let newUser: User;

  const post = plainToClass(CreatePostDto, {
    content: 'content sample',
    completed: true
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const user = plainToClass(CreateUserDto, {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      public: true,
      role: 'user',
      emailPublic: true,
      namePublic: true,
      verified: false
    });

    newUser = await prisma.user.create({
      data: {
        ...user,
        password: hashSync('passwordSample', 10)
      }
    });
  });

  afterEach(async () => {
    await prisma.user.delete({
      where: {
        email: newUser.email
      }
    })
  });

  afterAll(async () => {
    /* await clearDatabase(); */
    await prisma.$disconnect();
  });

  describe('find', () => {
    it('should return a list of posts', async () => {

      const dto = plainToClass(CreatePostDto, {
        newUser,
        content: 'content sample',
        verified: true
      });

      const posts = [...Array(5)].map(async () => await PostsService.create(newUser.uuid, dto));
      const result = await PostsService.find();

      expect(result.length).toBe(posts.length);
    })
  });

  /*  describe('create', () => {
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
 
   describe('findOne', () => {
     let user: User
 
     beforeAll(async () => {
       user = await userFactory.make()
     })
 
     it('should throw an error if the user does not exist', async () => {
       await expect(
         UsersService.findOne(faker.datatype.uuid()),
       ).rejects.toThrowError(new NotFound('No User found'))
     })
 
     it('should return the user', async () => {
       const result = await UsersService.findOne(user.uuid)
 
       expect(result).toHaveProperty('uuid', user.uuid)
     })
   })
 
   describe('getUuidFromToken', () => {
 
     it('should return a user uuid from token', async () => {
       const user = await userFactory.make({})
 
       const token = await AuthService.createToken(user.uuid)
 
       const result = await UsersService.getUuidFromToken(token.jti)
 
       expect(result).toEqual(user.uuid)
     })
 
   })
 
   describe('update', () => {
     beforeAll(() => {
       jest.mock('jsonwebtoken', () => ({
         sign: jest.fn().mockImplementation(() => 'my.jwt.token'),
       }))
     })
 
     it('should throw an error if the user does not exist', async () => {
       const data = plainToClass(UpdateUserDto, {})
 
       await expect(
         UsersService.update(faker.datatype.uuid(), data),
       ).rejects.toThrowError(new NotFound('User not found'))
     })
 
     it('should throw an error if the user tries to update the email with non unique email', async () => {
       const existingEmail = faker.internet.email()
       const [user] = await Promise.all([
         userFactory.make(),
         userFactory.make({ email: existingEmail }),
       ])
 
       const data = plainToClass(UpdateUserDto, { email: existingEmail })
 
       await expect(UsersService.update(user.uuid, data)).rejects.toThrowError(
         new UnprocessableEntity('email already taken'),
       )
     })
 
     it('should update the user', async () => {
       const user = await userFactory.make()
       const newEmail = faker.internet.email()
       const dto = plainToClass(UpdateUserDto, { email: newEmail })
 
       const result = await UsersService.update(user.uuid, dto)
 
       expect(result).toHaveProperty('email', newEmail)
 
     })
   }) */
})
