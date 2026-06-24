import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import { prisma } from './lib/prisma';

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({}));

app.get('/', async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  console.log(user);
  res.send('Hi, Prisma Server!');
});

export default app;
