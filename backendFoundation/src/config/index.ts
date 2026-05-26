import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config({ quiet: true });

const config = {
  port: env.PORT as string,
  databaseUrl: env.DATABASE_URL as string,
  node_env: env.NODE_ENV as string,
  jwtSecret: env.JWT_SECRET as string,
  jwtRefreshSecret: env.JWT_REFRESH_SECRET as string,
};

export default config;
