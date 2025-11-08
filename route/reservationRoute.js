import { Router } from 'express';
import {getReservation, getReservationsByUsername ,createReservation, getReservationsByClientID, getReservationsByPostID, updateReservation, deleteReservation} from '../controller/reservationController.js'
import {reservationValidatorMiddleware} from '../middleware/validation.js';



const router = Router();


router.post("/", reservationValidatorMiddleware.createReservationValidator,createReservation);           
router.get("/:id", getReservation);         
router.get("/", getReservationsByUsername);   
router.get("/client/:id", getReservationsByClientID);     
router.get("/post/:id", getReservationsByPostID);       
router.patch("/", reservationValidatorMiddleware.updateReservationValidator,updateReservation);
router.delete("/:id", deleteReservation);
export default router;