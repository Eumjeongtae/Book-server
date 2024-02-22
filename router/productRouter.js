import express from 'express';
import * as productController from '../controller/productController.js';

const router = express.Router();

router.get('/:genre', productController.getList);
router.get('/detail/:id/:uid', productController.getDetial);
router.post('/like', productController.bookLike);
router.post('/rent', productController.bookRent);
router.post('/return', productController.bookReturn);

export default router;
