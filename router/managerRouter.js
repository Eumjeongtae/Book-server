import express from 'express';
import * as managerController from "../controller/managerController.js";

const router = express.Router();

router.get('/:id_idx', managerController.getManagerList);




export default router;