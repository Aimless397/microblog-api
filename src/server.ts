/* import 'reflect-metadata' */
import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './router'

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() });
});
app.use('/', router(app));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});