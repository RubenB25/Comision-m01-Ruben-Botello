import { Router } from 'express';

import { validateToken } from '../middlewares/validate-token.js';
import { authHeader } from '../models/validations/auth-validation.js';
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPost,
  ctrlListPosts,
  ctrlUpdatePost,
  ctrlListAllPosts,
} from '../controllers/post.controller.js';
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  listPostValidations,
  updatePostValidations
} from '../models/validations/post-validations.js';

const postRouter = Router();

postRouter.post('/',authHeader, validateToken, createPostValidations, ctrlCreatePost);
postRouter.get('/',authHeader, validateToken, listPostValidations, ctrlListPosts);
postRouter.get('/all', ctrlListAllPosts);

postRouter.get('/:postId', getPostValidations, ctrlGetPost);
postRouter.patch('/:postId', authHeader, validateToken,updatePostValidations, ctrlUpdatePost);
postRouter.delete('/:postId', authHeader, validateToken,deletePostValidations, ctrlDeletePost);

export { postRouter };
