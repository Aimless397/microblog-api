import { User, Post } from '@prisma/client'
import faker from 'faker'
import 'jest-extended/all'
import { plainToInstance } from 'class-transformer'
import { NotFound } from 'http-errors'
import { CreateUserDto } from '../dtos/users/request/create-user.dto'
import { clearDatabase, prisma } from '../prisma'
import { PostsService } from './posts.service'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { hashSync } from 'bcryptjs'
import { PostCreatedDto } from '../dtos/posts/response/post-created.dto'
import { UpdatePostDto } from '../dtos/posts/request/update-post.dto'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { CommentsService } from './comments.service'
import { CommentCreatedDto } from '../dtos/comments/response/comment-created.dto'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('UserService', () => {

  let user: CreateUserDto;
  let newUser: User;
  let newPost: Post;
  let postDto: CreatePostDto;
  let commentDto: CreateCommentDto;
  

  afterAll(async () => {
      await clearDatabase()
      await prisma.$disconnect()
  })

  beforeAll(async () => {
    jest.clearAllMocks();

    user = plainToInstance(CreateUserDto, {
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

    postDto = plainToInstance(CreatePostDto, {
      content: 'content sample',
      completed: true
    });

    newPost = await prisma.post.create({
      data: {
        ...postDto,
        userId: newUser.uuid
      }
    });   

    commentDto = plainToInstance(CreateCommentDto,{
      postId: newPost.uuid,
      content: 'random comment',
      completed: true
    });
  });

  describe('find', () => {
    it('should return a list of comments', async () => {

      const comments = [...Array(2)].map(async()=>await CommentsService.create(newUser.uuid, commentDto));
      
      const result = await CommentsService.find(0,comments.length);
      
      expect(result.length).toBe(comments.length);
    });
  });

  describe('create', () => {
 
    it('should create a new comment', async () => {
      
      const result = await CommentsService.create(newUser.uuid,commentDto);

      console.log(result);
      

      expect(result).toHaveProperty('completed',true);
      });
    });

  describe('findOne', () => {

    let comment: CommentCreatedDto;
 
     beforeAll(async () => {
       comment = await CommentsService.create(newUser.uuid, commentDto);
     });
 
     it('should throw an error if the comment does not exist', async () => {
       await expect(
         CommentsService.findOne(faker.datatype.uuid()),
       ).rejects.toThrowError(new NotFound('No Comment found'));
     });
 
     it('should return the post', async () => {
       const result = await CommentsService.findOne(comment.uuid);
 
       expect(result).toHaveProperty('uuid', comment.uuid);
     });
   })
  // describe('findByUserId', () => {
  //   it('should return a post if parameters are correct', async () => {

  //     const post = await PostsService.create(newUser.uuid,postDto);
      
  //     const result = await PostsService.findByUserId(newUser.uuid,post.uuid);
      
  //     expect(result[0].userId).toEqual(newUser.uuid);
  //     expect(result[0].uuid).toEqual(post.uuid);
  //   });

  //    it('should return an empty array if user did not create the post', async () => {
       
  //     const post = await PostsService.create(newUser.uuid,postDto);
        
  //     const result = await PostsService.findByUserId(faker.datatype.uuid(),post.uuid);

  //     expect(result).toBeEmpty();
  //    });
    
  // });
 
  // describe('update', () => {
 
  //   it('should throw an error if the post does not exist', async () => {
  //     const data = plainToInstance(UpdatePostDto, {});

  //     await expect(
  //       PostsService.update(faker.datatype.uuid(), data),
  //     ).rejects.toThrowError(new NotFound('Post not found'));
  //   });

  //   it('should update the post', async () => {
  //     const data = plainToInstance(UpdatePostDto, { content: 'UPDATE POST' });
  //     const post = await PostsService.create(newUser.uuid,postDto);

  //     const result = await PostsService.update(post.uuid, data);

  //     expect(result).toHaveProperty('content', 'UPDATE POST');
  //   });
  // })

  // describe('remove', () => {
 
  //   it('should throw an error if the post does not exist', async () => {
  //     await expect(
  //       PostsService.remove(faker.datatype.uuid())
  //     ).rejects.toThrowError(new NotFound('Post not found'));

  //   });

  //   it('should remove the post', async () => {
     
  //     const post = await PostsService.create(newUser.uuid,postDto);

  //     const result = await PostsService.remove(post.uuid);

  //     expect(result).toHaveProperty('uuid', `${post.uuid}`);
  //   });
  // })
  
})
