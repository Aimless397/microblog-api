import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './router';
import YAML from 'yamljs';
import swaggerUI from "swagger-ui-express";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load('api.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() });
});
app.use('/', router(app));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
