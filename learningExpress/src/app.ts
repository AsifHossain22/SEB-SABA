import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import logger from './middleware/logger';
import CookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

// DefaultExpressMiddleWare
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

// CookieParserMiddleware
app.use(CookieParser());

// CustomMiddleware
app.use(logger);

// GET
app.get('/', (req: Request, res: Response) => {
  // res.send('Hello Express Server!');

  res.status(200).json({
    success: true,
    message: 'Hello Express Server!',
    author: 'Next Level Express',
  });
});

// UsersRoute
app.use('/api/users', userRoute);

// ProfilesRoute
app.use('/api/profile', profileRoute);

// AuthRoute
app.use('/api/auth', authRoute);

// GlobalErrorHandlingMiddleware
app.use(globalErrorHandler);

export default app;
