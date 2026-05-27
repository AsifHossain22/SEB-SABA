import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { logger } from './middleware/logger';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import authRoutes from './api/routes/auth.route';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Middleware
app.use(logger);
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Server!');
});

// AuthRoutes
app.use('/auth', authRoutes);

// GlobalErrorMiddleware
app.use(globalErrorHandler);

export default app;
