import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import {
  createUserWithAddress,
  getUserWithAddress,
  updateUserWithAddress,
  deleteUser,
  createUser
} from "../controller/userController.js";

import {clientValidatorMiddleware} from '../middleware/validation.js';

import {isSameUser} from '../middleware/identification/user.js'

const router = Router();

router.post("/", clientValidatorMiddleware.addClientValidator, createUser);      
router.post("/withAddress", clientValidatorMiddleware.addClientValidator, createUserWithAddress);      
router.get("/:id", checkJWT, getUserWithAddress);         
router.patch("/", checkJWT, isSameUser, clientValidatorMiddleware.updateClientValidator , updateUserWithAddress);     
router.delete("/:id", checkJWT, isSameUser, deleteUser);       

export default router;