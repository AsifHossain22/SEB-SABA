import type { TRUser } from '.';

declare global {
  namespace Express {
    interface Request {
      user: TRUser & { id: number };
    }
  }
}
