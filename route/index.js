import Router  from 'express';
import userRouter from './userRoute.js';
import addressRoute from './addressRoute.js';
import postRouter from './postRoute.js';
import reservationRouter from './reservationRoute.js';
import {login} from '../controller/loginController.js'
import {checkJWT} from '../middleware/identification/jwt.js'

const router = Router();

router.use('/users', userRouter);
router.use('/posts', checkJWT, postRouter);
router.use('/reservation', checkJWT, reservationRouter);
router.post('/login', login)
router.use('/addresses', addressRoute);
export default router;