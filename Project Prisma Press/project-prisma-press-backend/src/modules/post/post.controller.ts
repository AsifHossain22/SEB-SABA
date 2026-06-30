import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { postService } from './post.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

// CreatePost
const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const payload = req.body;

    const result = await postService.createPost(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Post Created Successfully!',
      data: result,
    });
  },
);

// GetAllPosts
const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPosts();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Posts Found Successfully!',
      data: result,
    });
  },
);

// GetSinglePost
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error('Post ID required in Params!');
    }

    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post found successfully!',
      data: result,
    });
  },
);

// UpdatePost
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// DeletePost
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// GetPostsStats
const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// GetMyPosts
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPosts(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'My Post found successfully!',
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};
