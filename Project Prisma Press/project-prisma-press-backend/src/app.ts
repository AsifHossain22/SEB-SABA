import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import { postRoutes } from './modules/post/post.route';
import { commentRoutes } from './modules/comment/comment.route';
import { notFound } from './middleware/notFound';
import httpStatus from 'http-status';
import { globalErrorHandler } from './middleware/globalErrorHandler';

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

// RootAPI
app.get('/', (req: Request, res: Response) => {
  res.send('Hi, Prisma Server!');
});

// RegisterAPI
app.use('/api/users', userRoutes);

// AuthAPI
app.use('/api/auth', authRoutes);

// PostsAPI
app.use('/api/posts', postRoutes);

// CommentsAPI
app.use('/api/comments', commentRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
