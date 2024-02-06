import express from 'express';
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post('/:site', userController.socialLogin);

export default router;