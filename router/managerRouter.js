import express from 'express';
import * as managerController from "../controller/managerController.js";

const router = express.Router();

router.get('/:id_idx', managerController.getManagerList);
router.get('/:id_idx/:book_id', managerController.bookEdit);
router.post('/', managerController.newBook);




export default router;