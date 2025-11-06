import { Router } from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPostByCategory
} from '../controller/postController.js';

import {checkJWT} from '../middleware/identification/jwt.js'

import {postOwner} from '../middleware/identification/postOwner.js';


const router = Router();

router.post("/", checkJWT, createPost);           
router.get("/byCategory", searchPostByCategory);  
router.get("/:id", getPost);         
router.patch("/", checkJWT, postOwner, updatePost);     
router.delete("/:id", checkJWT, postOwner, deletePost);      

export default router;
