import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import {
  create,
  find,
  me,
  /* passwordRecovery, */
  update,
  verify
} from '../controllers/users.controller';

const router = express.Router();

export function usersRoutes(): Router {
  router.route('/')
    .get(passport.authenticate('jwt', { session: false }), asyncHandler(find))
    .post(asyncHandler(create));

  router.route('/verify/:token')
    .get(asyncHandler(verify));

  router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), asyncHandler(me))
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(update));

  /* router.route('/password-recovery')
    .patch(passport.authenticate('jwt', { session: false }), asyncHandler(passwordRecovery)); */

  return router;
}