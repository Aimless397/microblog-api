import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  create,
  find,
  me,
  update
} from '../controllers/users.controller';

const router = express.Router();

export function usersRoutes(): Router {

  router.route('/')
    .get(asyncHandler(find))
    .post(asyncHandler(create))
  router.route('/me')
    .get(asyncHandler(me))
    .patch(asyncHandler(update))

  return router;
}