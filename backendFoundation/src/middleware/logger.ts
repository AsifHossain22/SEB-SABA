import type { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Time: [${new Date().toLocaleString()}], Method: ${req.method}, URL: ${req.url}`,
  );
  next();
};
