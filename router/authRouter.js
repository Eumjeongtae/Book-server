import express from 'express';
import * as authController from "../controller/authController.js";

const router = express.Router();

router.post('/:site', authController.socialLogin);

export default router;