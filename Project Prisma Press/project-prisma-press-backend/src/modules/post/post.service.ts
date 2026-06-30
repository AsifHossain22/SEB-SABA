import { prisma } from '../../lib/prisma';
import { ICreatePostPayload, IUpdatePostPayload } from './post.interface';

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
const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return updatedPost;
};

// UpdatePost
const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  // FindPost
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  // IsAdminOrAuthor
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You don't have permission to update this post!");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return result;
};

// DeletePost
const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  // FindPost
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  // IsAdminOrAuthor
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You don't have permission to delete this post!");
  }

  // const result = await prisma.post.delete({
  //   where: {
  //     id: postId,
  //   },
  // });
  // return result;

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

// TODO: GetPostsStats
const getPostsStats = async () => {};

// GetMyPosts
const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};
