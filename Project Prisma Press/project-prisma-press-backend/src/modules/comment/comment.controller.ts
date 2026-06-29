import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';

// CreateComment
const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// GetCommentAuthorId
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// GetCommentAuthorId
const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// UpdateComment
const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// DeleteComment
const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// ModerateComment
const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentController = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
