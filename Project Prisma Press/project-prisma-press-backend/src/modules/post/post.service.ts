import { CommentStatus, PostStatus } from '../../../generated/prisma/enums';
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
  // await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     views: {
  //       increment: 1,
  //     },
  //   },
  // });

  // // throw new Error('Fake Error!');

  // const post = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: postId,
  //   },
  //   include: {
  //     author: {
  //       omit: {
  //         password: true,
  //       },
  //     },
  //     comments: {
  //       where: {
  //         status: CommentStatus.APPROVED,
  //       },
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     },
  //     _count: {
  //       select: {
  //         comments: true,
  //       },
  //     },
  //   },
  // });

  // return post;

  const transactionResult = await prisma.$transaction(
    async tx => {
      await tx.post.update({
        where: {
          id: postId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      // throw new Error('Fake Error!');

      const post = await tx.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
          comments: {
            where: {
              status: CommentStatus.APPROVED,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
      return post;
    },
    {
      maxWait: 15000, // Wait up to 15 seconds to grab a connection from the pool (default: 2s)
      timeout: 20000, // Give the block up to 20 seconds to execute completely (default: 5s)
    },
  );
  return transactionResult;
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

// GetPostsStats
const getPostsStats = async () => {
  const transactionResult = await prisma.$transaction(async tx => {
    const totalPosts = await tx.post.count();

    // TotalPublishedPosts
    const totalPublishedPosts = await tx.post.count({
      where: {
        status: PostStatus.PUBLISHED,
      },
    });

    // TotalDraftPosts
    const totalDraftPosts = await tx.post.count({
      where: {
        status: PostStatus.DRAFT,
      },
    });

    // TotalArchivedPosts
    const totalArchivedPosts = await tx.post.count({
      where: {
        status: PostStatus.ARCHIVED,
      },
    });

    // TotalComments
    const totalComments = await tx.comment.count();

    // TotalApprovedComments
    const totalApprovedComments = await tx.comment.count({
      where: {
        status: CommentStatus.APPROVED,
      },
    });

    // TotalRejectedComments
    const totalRejectedComments = await tx.comment.count({
      where: {
        status: CommentStatus.REJECT,
      },
    });

    return {
      totalPosts,
      totalPublishedPosts,
      totalDraftPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
    };
  });
  return transactionResult;
};

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
