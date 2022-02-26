import express, { Router } from 'express';
import { usersRoutes } from './routes/users.route';
import { authRoutes } from './routes/auth.route';
import { postsRoutes } from './routes/posts.route';

const expressRouter = express.Router();

export function router(app: Router): Router {
  app.use('/api/v1/auth', authRoutes());
  app.use('/api/v1/users', usersRoutes());
  app.use('/api/v1/posts', postsRoutes());

  return expressRouter;
}