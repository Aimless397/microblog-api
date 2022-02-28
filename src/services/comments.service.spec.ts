import { User, Post, Comment } from '@prisma/client'
import faker from 'faker'
import 'jest-extended/all'
import { plainToInstance } from 'class-transformer'
import { NotFound } from 'http-errors'
import { CreateUserDto } from '../dtos/users/request/create-user.dto'
import { clearDatabase, prisma } from '../prisma'
import { CreatePostDto } from '../dtos/posts/request/create-post.dto'
import { hashSync } from 'bcryptjs'
import { CreateCommentDto } from '../dtos/comments/request/create-comment.dto'
import { CommentsService } from './comments.service'
import { CommentCreatedDto } from '../dtos/comments/response/comment-created.dto'
import { UpdateCommentDto } from '../dtos/comments/request/update-comment.dto'
import { CreateCommentReactionDto } from '../dtos/commentReactions/request/create-comment-reaction.dto'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('UserService', () => {

  let user: CreateUserDto;
  let newUser: User;
  let newPost: Post;
  let newComment: Comment;
  let postDto: CreatePostDto;
  let commentDto: CreateCommentDto;
  let reaction: CreateCommentReactionDto;

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

  describe('findByUserId', () => {
    it('should return a comment if parameters are correct', async () => {

      const comment = await CommentsService.create(newUser.uuid,commentDto);
      
      const result = await CommentsService.findByUserId(newUser.uuid, comment.uuid);
      
      expect(result[0].userId).toEqual(newUser.uuid);
      expect(result[0].uuid).toEqual(comment.uuid);
    });

     it('should return an empty array if user did not create the comment', async () => {
       
      const comment = await CommentsService.create(newUser.uuid, commentDto);
        
      const result = await CommentsService.findByUserId(faker.datatype.uuid(), comment.uuid);

      expect(result).toBeEmpty();
     });
    
  });
 
  describe('update', () => {
 
    it('should throw an error if the comment does not exist', async () => {
      const data = plainToInstance(UpdateCommentDto, {});

      await expect(
        CommentsService.update(faker.datatype.uuid(), data),
      ).rejects.toThrowError(new NotFound('Comment not found'));
    });

    it('should update the comment', async () => {
      const data = plainToInstance(UpdateCommentDto, { content: 'UPDATE COMMENT' });
      const post = await CommentsService.create(newUser.uuid, commentDto);

      const result = await CommentsService.update(post.uuid, data);

      expect(result).toHaveProperty('content', 'UPDATE COMMENT');
    });
  })

  describe('remove', () => {
 
    it('should throw an error if the comment does not exist', async () => {
      await expect(
        CommentsService.remove(faker.datatype.uuid())
      ).rejects.toThrowError(new NotFound('Comment not found'));

    });

    it('should remove the post', async () => {
     
      const comment = await CommentsService.create(newUser.uuid,commentDto);

      const result = await CommentsService.remove(comment.uuid);

      expect(result).toHaveProperty('uuid', `${comment.uuid}`);
    });
  })

  describe('Reactions: ',()=>{

    beforeAll(async ()=>{

      newComment = await prisma.comment.create({
        data: {
          ...commentDto,
          userId: newUser.uuid
        }
      }); 

      reaction = plainToInstance(CreateCommentReactionDto, {
        commentId: newComment.uuid,
        status: 'L'
      });
    });


    describe('createReaction',()=>{
    
      it('should create a reaction for the comment',async ()=>{
  
        const result = await CommentsService.createReaction(newUser.uuid,reaction);
        expect(result).toHaveProperty('status','L');
  
      })
    })

    describe('updateReaction',()=>{
    
      it('should update the reaction for the comment',async ()=>{
  
        const newReaction = await CommentsService.createReaction(newUser.uuid,reaction);

        const result = await CommentsService.updateReaction(newReaction.uuid,'D')

        expect(result).toHaveProperty('status','D');
  
      })

      it('should throw an error if the comment does not exist',async ()=>{
        expect(async()=>{
          const result = await CommentsService.updateReaction(faker.datatype.uuid(),'D')
        })
        .rejects.toThrowError(new NotFound('Comment Reaction not found'));
      });
    })

    describe('findPostReaction',()=>{
      it('should return the reaction to a post',async ()=>{
        const newReaction = await CommentsService.createReaction(newUser.uuid,reaction);

        const result = await CommentsService.findCommentReaction(newReaction.commentId,newUser.uuid);

        expect(result[0]).toHaveProperty('status','L');
        expect(result[0]).toHaveProperty('userId',newReaction.userId);
      })

      it('should return an empty array if there is no reaction to the comment',async ()=>{
       
        const result = await CommentsService.findCommentReaction(faker.datatype.uuid(),newUser.uuid);

        expect(result).toBeEmpty();
      })
    })

  })
})
