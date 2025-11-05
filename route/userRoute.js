import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import { uploadPhoto } from '../middleware/photo/upload.js';
import {
  getUserWithAddress,
  updateUser,
  deleteUser,
  createUser,
  getUsers
} from "../controller/userController.js";

import {clientValidatorMiddleware} from '../middleware/validation.js';

const router = Router();

router.post("/", clientValidatorMiddleware.addClientValidator,uploadPhoto, createUser);      
router.post("/withAddress", clientValidatorMiddleware.addClientValidator, getUsers);      
router.get("/:id", checkJWT, clientValidatorMiddleware.loginValidator,getUserWithAddress);         
router.patch("/", checkJWT, clientValidatorMiddleware.updateClientValidator , updateUser);     
router.delete("/:id", checkJWT, deleteUser);       

export default router;