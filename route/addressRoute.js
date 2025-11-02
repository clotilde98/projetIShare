import { Router } from 'express';


import {importPostalData, getAllCities} from '../controller/addressController.js';
const router = Router();


router.get('/import', importPostalData);
router.get('/all', getAllCities);

export default router;