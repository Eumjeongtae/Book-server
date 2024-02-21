import express from 'express';
import * as loginController from "../controller/loginController.js";

const router = express.Router();

router.post('/', loginController.login);



export default router;