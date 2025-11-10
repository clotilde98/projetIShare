import Router from 'express';
import {getCategories, createTypeProduct, updateTypeProduct, deleteTypeProduct} from '../controller/productTypeController.js';
import {checkJWT} from '../middleware/identification/jwt.js'
import {mustBeAdmin} from '../middleware/identification/mustBeAdmin.js'


const router = Router();

router.get('/',checkJWT,mustBeAdmin, getCategories);

router.post('/', checkJWT,mustBeAdmin,createTypeProduct);
router.patch('/',checkJWT,mustBeAdmin, updateTypeProduct);
router.delete('/',checkJWT,mustBeAdmin, deleteTypeProduct);


export default router;

