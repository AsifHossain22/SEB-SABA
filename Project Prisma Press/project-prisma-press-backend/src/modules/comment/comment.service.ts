import { prisma } from '../../lib/prisma';
import {
  ICreateCommentPayload,
  IModerateCommentPayload,
  IUpdateCommentPayload,
} from './comment.interface';

// CreateComment
const createComment = async (
  authorId: string,
  payload: ICreateCommentPayload,
) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
  });
  return comment;
};

// GetCommentByAuthorId
const getCommentByAuthorId = async (authorId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return comments;
};

// GetCommentByCommentId
const getCommentByCommentId = async (commentId: string) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
  return comment;
};

// UpdateComment
const updateComment = async (
  commentId: string,
  payload: IUpdateCommentPayload,
  authorId: string,
) => {
  // FindComment
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  //CommentDataExistOrNot
  // if (!commentData) {
  //   throw new Error('Your provided input is invalid!');
  // }

  const comment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data: payload,
  });
  return comment;
};

// DeleteComment
const deleteComment = async (
  commentId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  // CommentDataExistOrNot
  // if (!commentData) {
  //   throw new Error('Your provided input is invalid!');
  // }

  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return comment;
};

// ModerateComment
const moderateComment = async (id: string, data: IModerateCommentPayload) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (commentData.status === data.status) {
    throw new Error(
      `Your provided status (${data.status}) is already up to date.`,
    );
  }

  const comment = await prisma.comment.update({
    where: {
      id,
    },
    data,
  });

  return comment;
};

export const commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
