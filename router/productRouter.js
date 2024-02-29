import express from 'express';
import * as productController from '../controller/productController.js';

const router = express.Router();

router.get('/detail/:id/:uid', productController.getDetail);
router.get('/:genre/:startIndex/:endIndex', productController.getList);
router.post('/like', productController.bookLike);
router.post('/rent', productController.bookRent);
router.post('/return', productController.bookReturn);
router.post('/reservation', productController.bookReservation);
router.post('/reservationCancel', productController.bookReservationCancel);
router.get('/myPage/:user_id/:tab', productController.myPage);

export default router;
