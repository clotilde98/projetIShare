import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import {
  getUserWithAddress,
  updateUser,
  deleteUser,
  createUser,
  getUsers
} from "../controller/userController.js";

const router = Router();

router.post("/", createUser);      
router.get('/', getUsers);
router.get("/:id", getUserWithAddress);         
router.patch("/", checkJWT, updateUser);     
router.delete("/:id", checkJWT, deleteUser);


export default router;