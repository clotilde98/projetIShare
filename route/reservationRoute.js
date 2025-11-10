import { Router } from 'express';
import {getReservation, getReservationsByUsername ,createReservation, getReservationsByClientID, getReservationsByPostID, updateReservation, deleteReservation} from '../controller/reservationController.js'
import {reservationValidatorMiddleware} from '../middleware/validation.js';

import {isReservationOwner} from '../middleware/identification/isReservationOwner.js';

import {checkJWT} from '../middleware/identification/jwt.js'
import {checkReservationAccess} from '../middleware/identification/checkReservationAccess.js'
import { mustBeAdmin } from '../middleware/identification/mustBeAdmin.js';
import {postOwner} from '../middleware/identification/postOwner.js';

const router = Router();


router.post("/",checkJWT, reservationValidatorMiddleware.createReservationValidator,createReservation);           
router.get("/:id",checkJWT,checkReservationAccess(true), getReservation);         
router.get("/", checkJWT,mustBeAdmin,getReservationsByUsername);   
router.get("/client/:id",checkJWT, getReservationsByClientID);     
router.get("/post/:id",checkJWT,postOwner, getReservationsByPostID);       
router.patch("/",checkJWT,isReservationOwner,reservationValidatorMiddleware.updateReservationValidator,updateReservation);
router.delete("/:id",checkJWT,isReservationOwner,deleteReservation);
export default router;