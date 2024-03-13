import express from 'express';
import * as managerController from "../controller/managerController.js";

const router = express.Router();

router.get('/:id_idx', managerController.getManagerList);
router.get('/:id_idx/:book_id', managerController.bookEdit);
router.post('/modify', managerController.modify);
router.post('/', managerController.newBook);
router.delete('/:id', managerController.deleteBook);





export default router;