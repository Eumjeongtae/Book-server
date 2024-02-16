import express from 'express';
import * as signController from "../controller/signController.js";

const router = express.Router();

router.post('/', signController.emailCheck);
router.post('/mailCheck', signController.emailCheck);

export default router;