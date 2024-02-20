import express from 'express';
import * as newBookController from "../controller/newBookController.js";

const router = express.Router();

router.post('/', newBookController.newBook);

export default router;