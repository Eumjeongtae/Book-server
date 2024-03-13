import express from 'express';
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post('/', userController.signUp);
router.post('/mailCheck/:sendMailValue', userController.emailCheck);
router.post('/idCheck', userController.idCheck);


export default router;