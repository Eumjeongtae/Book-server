import express from 'express';
import * as signController from "../controller/signController.js";

const router = express.Router();

router.post('/', signController.signUp);
router.post('/mailCheck', signController.emailCheck);
router.post('/idCheck', signController.idCheck);


export default router;