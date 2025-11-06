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


const router = Router();

router.post("/",checkJWT,postValidatorMiddleware.createPostValidator,createPost);           
router.get("/byCategory", searchPostByCategory);  
router.get("/:id", getPost);         
router.patch("/",checkJWT,postValidatorMiddleware.updatePostValidator,updatePost);     
router.delete("/:id",checkJWT, deletePost);      

export default router;
