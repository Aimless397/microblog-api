import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { commentReaction, createComment, findComments, removeComment, updateComment } from '../controllers/comments.controller';
import {
  find,
  findOne,
  create,
  update,
  remove,
  reaction,
} from '../controllers/posts.controller';

const router = express.Router();

export function postsRoutes(): Router {

  router.route('/')
    .get(asyncHandler(find))
    .post(passport.authenticate('jwt', { session: false }), asyncHandler(create));

  router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), asyncHandler(findOne))
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(update))
    .delete(passport.authenticate('jwt', { session: false }), asyncHandler(remove));

  router.route('/:id/:reaction')
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(reaction));

  // COMMMENTS
  router.route('/:id/comments')
    .get(asyncHandler(findComments))
    .post(passport.authenticate('jwt', { session: false }), asyncHandler(createComment));

  router.route('/:id/comments/:commentId')
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(updateComment))
    .delete(passport.authenticate('jwt', { session: false }), asyncHandler(removeComment));

  router.route('/:id/comments/:commentId/:reaction')
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(commentReaction));

  return router;
}