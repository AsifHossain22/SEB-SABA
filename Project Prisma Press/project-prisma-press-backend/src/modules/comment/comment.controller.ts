import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { commentService } from './comment.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

// CreateComment
const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;

    const result = await commentService.createComment(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Comment created successfully!',
      data: result,
    });
  },
);

// GetCommentByAuthorId
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    if (!authorId) {
      throw new Error('Author ID required in Params!');
    }

    const result = await commentService.getCommentByAuthorId(
      authorId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comments found successfully for the author!',
      data: result,
    });
  },
);

// GetCommentByCommentId
const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    const result = await commentService.getCommentByCommentId(
      commentId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment found successfully!',
      data: result,
    });
  },
);

// UpdateComment
const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    const payload = req.body;
    const userId = req.user?.id as string;
    const role = req.user?.role;
    const isAdmin = role === 'ADMIN';

    const result = await commentService.updateComment(
      commentId as string,
      payload,
      userId,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment updated successfully!',
      data: result,
    });
  },
);

// DeleteComment
const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id as string;
    const role = req.user?.role;
    const isAdmin = role === 'ADMIN';

    await commentService.deleteComment(commentId as string, userId, isAdmin);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment deleted successfully!',
      data: null,
    });
  },
);

// ModerateComment
const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const payload = req.body;

    const result = await commentService.moderateComment(
      commentId as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment moderation status updated successfully!',
      data: result,
    });
  },
);

export const commentController = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
