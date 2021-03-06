import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import {
  /* signup, */
  login,
  logout
} from '../controllers/auth.controller';

const router = express.Router();

export function authRoutes(): Router {
  /* router.route('/signup')
    .post(asyncHandler(signup));
 */
  router.route('/login')
    .post(asyncHandler(login));

  router.route('/logout')
    .post(passport.authenticate('jwt', { session: false }), asyncHandler(logout));

  return router;
}