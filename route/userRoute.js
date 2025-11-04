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

const router = Router();

router.post("/", clientValidatorMiddleware.addClientValidator, createUser);      
router.post("/withAddress", clientValidatorMiddleware.addClientValidator, createUserWithAddress);      
router.get("/:id", checkJWT, clientValidatorMiddleware.loginValidator,getUserWithAddress);         
router.patch("/", checkJWT, clientValidatorMiddleware.updateClientValidator , updateUserWithAddress);     
router.delete("/:id", checkJWT, deleteUser);       

export default router;