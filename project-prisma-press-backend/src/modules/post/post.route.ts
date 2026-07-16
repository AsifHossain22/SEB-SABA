import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';
import { postController } from './post.controller';

const router = Router();

// CreatePost
router.post(
  '/',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.createPost,
);

// GetAllPosts
router.get('/', postController.getAllPosts);

// GetPostStats
router.get('/stats', auth(Role.ADMIN), postController.getPostsStats);

// GetMyPosts
router.get(
  '/my-posts',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.getMyPosts,
);

// PostById - SinglePost
router.get('/:postId', postController.getPostById);

// UpdatePost
router.patch(
  '/:postId',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.updatePost,
);

// DeletePost
router.delete(
  '/:postId',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.deletePost,
);

export const postRoutes = router;
