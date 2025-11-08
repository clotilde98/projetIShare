import Router from 'express';
import {getCategories, createTypeProduct, updateTypeProduct, deleteTypeProduct} from '../controller/productTypeController.js';
const router = Router();

router.get('/', getCategories);

router.post('/', createTypeProduct);
router.patch('/', updateTypeProduct);
router.delete('/', deleteTypeProduct);


export default router;

