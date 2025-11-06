import { Router } from 'express';
import {getReservation, createReservation, getReservationsByClientID, getReservationsByPostID, updateReservation, deleteReservation} from '../controller/reservationController.js'
import {reservationValidatorMiddleware} from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js'


const router = Router();


router.post("/", checkJWT,reservationValidatorMiddleware.createReservationValidator,createReservation);           
router.get("/:id", getReservation);         
router.get("/client/:id", getReservationsByClientID);     
router.get("/post/:id", getReservationsByPostID);       
router.patch("/",checkJWT,reservationValidatorMiddleware.updateReservationValidator,updateReservation);
router.delete("/:id",checkJWT, deleteReservation);
export default router;