import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import {readAllComment, createComment, updateComment, deleteComment, searchCommentByDate} from '../controller/commentController.js';
import {commentValidatorMiddleware} from '../middleware/validation.js';


const router = Router();

router.get('/',readAllComment);
router.get('/search', searchCommentByDate);
router.post('/',checkJWT,commentValidatorMiddleware.addCommentValidator,createComment);
router.patch('/',checkJWT,commentValidatorMiddleware.updateCommentValidator,updateComment);
router.delete('/:id',checkJWT, deleteComment);


export default router;
