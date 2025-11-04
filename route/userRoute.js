import { Router } from 'express';
import uploadPhoto from '../middleware/uploadPhoto/photo.js';
import {checkJWT} from '../middleware/identification/jwt.js'
import {
  getUserWithAddress,
  updateUser,
  deleteUser,
  createUser,
  getUsers
} from "../controller/userController.js";

const router = Router();

router.post("/",uploadPhoto, createUser);      
router.get('/', getUsers);
router.get("/:id", getUserWithAddress);         
router.patch("/", checkJWT, updateUser);     
router.delete("/:id", checkJWT, deleteUser);


export default router;