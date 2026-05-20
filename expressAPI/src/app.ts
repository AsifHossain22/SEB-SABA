import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { logger } from './middleware/logger';
import { globalErrorHandler } from './middleware/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(logger);

app.get('/', (req: Request, res: Response) => {
  throw new Error('Server is dying!');
  res.send('Hello SERVER!');
});
app.use(globalErrorHandler);

export default app;
