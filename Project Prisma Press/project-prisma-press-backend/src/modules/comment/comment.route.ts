import { Router } from 'express';
import { Role } from '../../../generated/prisma/enums';
import { auth } from '../../middleware/auth';
import { commentController } from './comment.controller';

const router = Router();

// CreateComment
router.post(
  '/',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.createComment,
);

// GetCommentById
router.get('/author/:authorId', commentController.getCommentByAuthorId);

// GetCommentById
router.get('/:commentId', commentController.getCommentByCommentId);

// UpdateComment
router.patch(
  '/:commentId',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.updateComment,
);

// DeleteComment
router.delete(
  '/:commentId',
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  commentController.deleteComment,
);

// ModerateComment
router.put(
  '/:commentId/moderate',
  auth(Role.ADMIN),
  commentController.moderateComment,
);

export const commentRoutes = router;
