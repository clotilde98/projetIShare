import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import { uploadPhoto } from '../middleware/photo/upload.js';
import {
  updateUser,
  deleteUser,
  createUser,
  getUsers
} from "../controller/clientController.js";

import {clientValidatorMiddleware} from '../middleware/validation.js';

import {isSameUser} from '../middleware/identification/user.js'

const router = Router();

router.post("/", clientValidatorMiddleware.addClientValidator, uploadPhoto, createUser);           
router.get("/:id", checkJWT, getUsers);         
router.patch("/", checkJWT, isSameUser, clientValidatorMiddleware.updateClientValidator , updateUser);     
router.delete("/:id", checkJWT, isSameUser, deleteUser);       

export default router;