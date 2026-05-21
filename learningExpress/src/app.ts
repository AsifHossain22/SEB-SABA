import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import fs from 'fs';

const app: Application = express();

// MiddleWare
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Method - URL - Time:', req.method, req.url, Date.now());

  const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`;

  fs.appendFile('logger.txt', log, err => {
    console.log(err);
  });

  next();
});

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

export default app;
