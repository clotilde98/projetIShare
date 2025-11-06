import { Router } from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPostByCategory
} from '../controller/postController.js';

import {checkJWT} from '../middleware/identification/jwt.js'
import {postValidatorMiddleware} from '../middleware/validation.js';

import {postOwner} from '../middleware/identification/postOwner.js';


const router = Router();

router.post("/", checkJWT, postValidatorMiddleware.createPostValidator, createPost);           
router.get("/byCategory", searchPostByCategory);  
router.get("/:id", getPost);         
router.patch("/", checkJWT, postOwner, postValidatorMiddleware.updatePostValidator, updatePost);     
router.delete("/:id", checkJWT, postOwner, deletePost);      

export default router;
