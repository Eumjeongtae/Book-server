import express from 'express';
import * as mainController from '../controller/mainController.js';

const router = express.Router();

router.get('/', mainController.getMain);


export default router;
