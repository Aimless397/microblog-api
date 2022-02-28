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
import { CreatePostReactionDto } from '../dtos/postReactions/request/create-post-reaction.dto'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('UserService', () => {

  let user: CreateUserDto;
  let newUser: User;
  let dto: CreatePostDto;
  let reaction: CreatePostReactionDto;
  let post: Post;
  

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
    dto = plainToInstance(CreatePostDto, {
      content: 'content sample',
      completed: true
    });
  });

  describe('find', () => {
    it('should return a list of posts', async () => {

      const posts = [...Array(2)].map(async()=>await PostsService.create(newUser.uuid, dto));
      
      const result = await PostsService.find(0,posts.length);
      
      expect(result.length).toBe(posts.length);
    });
  });

  describe('create', () => {
 
    it('should create a new post', async () => {
      
      const result = await PostsService.create(newUser.uuid,dto);

      expect(result).toHaveProperty('completed',true);
      });
    });

  describe('findOne', () => {

    let post: PostCreatedDto;
 
     beforeAll(async () => {
       post = await PostsService.create(newUser.uuid, dto);
     });
 
     it('should throw an error if the post does not exist', async () => {
       await expect(
         PostsService.findOne(faker.datatype.uuid()),
       ).rejects.toThrowError(new NotFound('No Post found'));
     });
 
     it('should return the post', async () => {
       const result = await PostsService.findOne(post.uuid);
 
       expect(result).toHaveProperty('uuid', post.uuid);
     });
   })
  describe('findByUserId', () => {
    it('should return a post if parameters are correct', async () => {

      const post = await PostsService.create(newUser.uuid,dto);
      
      const result = await PostsService.findByUserId(newUser.uuid,post.uuid);
      
      expect(result[0].userId).toEqual(newUser.uuid);
      expect(result[0].uuid).toEqual(post.uuid);
    });

     it('should return an empty array if user did not create the post', async () => {
       
      const post = await PostsService.create(newUser.uuid,dto);
        
      const result = await PostsService.findByUserId(faker.datatype.uuid(),post.uuid);

      expect(result).toBeEmpty();
     });
    
  });
 
  describe('update', () => {
 
    it('should throw an error if the post does not exist', async () => {
      const data = plainToInstance(UpdatePostDto, {});

      await expect(
        PostsService.update(faker.datatype.uuid(), data),
      ).rejects.toThrowError(new NotFound('Post not found'));
    });

    it('should update the post', async () => {
      const data = plainToInstance(UpdatePostDto, { content: 'UPDATE POST' });
      const post = await PostsService.create(newUser.uuid,dto);

      const result = await PostsService.update(post.uuid, data);

      expect(result).toHaveProperty('content', 'UPDATE POST');
    });
  })

  describe('remove', () => {
 
    it('should throw an error if the post does not exist', async () => {
      await expect(
        PostsService.remove(faker.datatype.uuid())
      ).rejects.toThrowError(new NotFound('Post not found'));

    });

    it('should remove the post', async () => {
     
      const post = await PostsService.create(newUser.uuid,dto);

      const result = await PostsService.remove(post.uuid);

      expect(result).toHaveProperty('uuid', `${post.uuid}`);
    });
  })

  describe('Reactions: ',()=>{

    beforeAll(async ()=>{

      post = await prisma.post.create({
        data: {
          ...dto,
          userId: newUser.uuid
        }
      }); 

      reaction = plainToInstance(CreatePostReactionDto, {
        postId: post.uuid,
        status: 'L'
      });
    });


    describe('createReaction',()=>{
    
      it('should create a reaction for the post',async ()=>{
  
        const result = await PostsService.createReaction(newUser.uuid,reaction);
        expect(result).toHaveProperty('status','L');
  
      })
    })

    describe('updateReaction',()=>{
    
      it('should update the reaction for the post',async ()=>{
  
        const newReaction = await PostsService.createReaction(newUser.uuid,reaction);

        const result = await PostsService.updateReaction(newReaction.uuid,'D')

        expect(result).toHaveProperty('status','D');
  
      })

      it('should throw an error if the post does not exist',async ()=>{
        expect(async()=>{
          const result = await PostsService.updateReaction(faker.datatype.uuid(),'D')
        })
        .rejects.toThrowError(new NotFound('Post Reaction not found'));
      });
    })

    describe('findPostReaction',()=>{
      it('should return the reaction to a post',async ()=>{
        const newReaction = await PostsService.createReaction(newUser.uuid,reaction);

        const result = await PostsService.findPostReaction(newReaction.postId,newUser.uuid);

        expect(result[0]).toHaveProperty('status','L');
        expect(result[0]).toHaveProperty('userId',newReaction.userId);
      })

      it('should return an empty array if there is no reaction to the post',async ()=>{
       
        const result = await PostsService.findPostReaction(faker.datatype.uuid(),newUser.uuid);

        expect(result).toBeEmpty();
      })
    })

  })
})
