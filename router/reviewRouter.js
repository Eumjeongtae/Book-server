import express from 'express';
import * as reviewController from "../controller/reviewController.js";

const router = express.Router();

router.post('/', reviewController.setReview);

export default router;