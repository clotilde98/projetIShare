import { Router } from 'express';
import { getTotalPosts, getTotalReservations, getTotalConfirmedReservations, getTotalUsers } from '../controller/dashboardController.js'; 

import { checkJWT } from '../middleware/identification/jwt.js';
import { mustBeAdmin } from '../middleware/identification/mustBeAdmin.js';


const router = Router();

router.get("/posts/count", checkJWT,mustBeAdmin, getTotalPosts); 
router.get("/reservations/count", checkJWT,mustBeAdmin,getTotalReservations); 
router.get("/withdrawals/count",checkJWT,mustBeAdmin, getTotalConfirmedReservations); 
router.get("/users/count",checkJWT,mustBeAdmin,getTotalUsers); 

export default router;