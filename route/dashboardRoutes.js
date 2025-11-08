// dashboardRoutes.js
import { Router } from 'express';
// Importez toutes les nouvelles fonctions
import { getTotalPosts, getTotalReservations, getTotalConfirmedReservations, getTotalUsers } from '../controller/dashboardController.js'; 

const router = Router();

router.get("/posts/count",  getTotalPosts); 
router.get("/reservations/count", getTotalReservations); 
router.get("/withdrawals/count", getTotalConfirmedReservations); 
router.get("/users/count",getTotalUsers); 

export default router;