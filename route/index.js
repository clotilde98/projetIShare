import Router  from 'express';
import userRouter from './clientRoute.js';
import postRouter from './postRoute.js';
import reservationRouter from './reservationRoute.js';
import {login} from '../controller/loginController.js'
import {checkJWT} from '../middleware/identification/jwt.js'
import {clientValidatorMiddleware} from '../middleware/validation.js';
import {getAllCities} from '../controller/addressController.js';
const router = Router();

router.use('/users', userRouter);
router.use('/posts', checkJWT, postRouter);
router.use('/reservation', checkJWT, reservationRouter);
router.post('/login',clientValidatorMiddleware.loginValidator, login)
router.get('/getAllCities', getAllCities);
export default router;