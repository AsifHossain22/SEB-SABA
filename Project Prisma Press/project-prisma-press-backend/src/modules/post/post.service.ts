import { prisma } from '../../lib/prisma';
import { ICreatePostPayload } from './post.interface';

// CreatePost
const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

// GetAllPosts
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return posts;
};

// GetSinglePosts
const getPostById = () => {};

// UpdatePost
const updatePost = () => {};

// DeletePost
const deletePost = () => {};

// GetPostsStats
const getPostsStats = () => {};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
};
