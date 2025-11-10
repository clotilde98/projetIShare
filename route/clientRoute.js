import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import { uploadPhoto } from '../middleware/photo/upload.js';
import {
  updateUser,
  deleteUser,
  createUser,
  getUsers,
  getOwnUser
} from "../controller/clientController.js";

import {clientValidatorMiddleware} from '../middleware/validation.js';

import {isSameUser} from '../middleware/identification/user.js'

import {mustBeAdmin} from '../middleware/identification/mustBeAdmin.js'


const router = Router();


/**
 * @swagger
 * /product:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Product
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ProductAdded'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Error server
 */

router.post("/", clientValidatorMiddleware.addClientValidator, uploadPhoto, createUser); 
router.get("/me", checkJWT, getOwnUser);    
router.get("/:id", checkJWT,mustBeAdmin, getUsers);      
router.patch("/", checkJWT, isSameUser, clientValidatorMiddleware.updateClientValidator , updateUser);     
router.delete("/:id", checkJWT, isSameUser, deleteUser);       

export default router;


