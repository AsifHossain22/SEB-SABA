import { prisma } from '../../lib/prisma';
import {
  ICreateCommentPayload,
  IModerateCommentPayload,
  IUpdateCommentPayload,
} from './comment.interface';

// CreateComment
const createComment = async (
  payload: ICreateCommentPayload,
  userId: string,
) => {
  // IsPostExists
  const postExists = await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  if (!postExists) {
    throw new Error(
      `Can't comment - Post with ID '${payload.postId}' doesn't exist!`,
    );
  }

  const result = await prisma.comment.create({
    data: {
      ...payload,
      postId: payload.postId,
      authorId: userId,
    },
  });
  return result;
};

// GetCommentByAuthorId
const getCommentByAuthorId = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
          isFeatured: true,
        },
      },
      author: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

// GetCommentByCommentId
const getCommentByCommentId = async (commentId: string) => {
  const result = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          content: true,
          isFeatured: true,
        },
      },
      author: {
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

// UpdateComment
const updateComment = async (
  commentId: string,
  payload: IUpdateCommentPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  // FindComment
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  //IsAdminOrAuthor
  if (!isAdmin && comment.authorId !== authorId) {
    throw new Error("You don't have permission to update this comment!");
  }

  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

// DeleteComment
const deleteComment = async (
  commentId: string,
  userId: string,
  isAdmin: boolean,
) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  //IsAdminOrAuthor
  if (!isAdmin && comment.authorId !== userId) {
    throw new Error("You don't have permission to delete this comment!");
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

// ModerateComment
const moderateComment = async (
  commentId: string,
  payload: IModerateCommentPayload,
) => {
  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
