import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import {
  getAll,
  findOne,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller';

const router = express.Router();

export function postsRoutes(): Router {

  router.route('/')
    .get(passport.authenticate('jwt', { session: false }), asyncHandler(getAll))
    .post(passport.authenticate('jwt', { session: false }), asyncHandler(createPost));

  router.route('/:id')
    .get(asyncHandler(findOne))

  return router;
}