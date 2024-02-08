import express from 'express';
import * as productController from "../controller/productController.js";

const router = express.Router();

router.get('/', productController.getList);

export default router;