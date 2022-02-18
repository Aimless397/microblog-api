/* import 'reflect-metadata' */
import express, { Application, Request, Response, NextFunction } from "express";
import { router } from "./router";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app: Application = express();
const PORT = process.env.PORT || 3000;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      tittle: "Miniblog API Documentation",
      description: "This is the documentation for the miniblog api",
      contact: {
        name: "Ravn",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["server.ts"],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/status", (req: Request, res: Response) => {
  res.json({ time: new Date() });
});
app.use("/", router(app));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/users', (req: Request, res: Response)=>{
  res.status(200).send('users info')
})

/**
 * @swagger 
 * /users:
 * get:
 *  description: Use to request all users
 *  responses: 
 *    '200':
 *      description: A succesfull response
*/

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});

