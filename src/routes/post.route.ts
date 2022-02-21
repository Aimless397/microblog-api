import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAll,
  findPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/posts.controller';

const router = express.Router();

export function postsRoutes(): Router {

  router.route('/')
    .get(asyncHandler(getAll))
    .post(asyncHandler(createPost));

  return router;
}