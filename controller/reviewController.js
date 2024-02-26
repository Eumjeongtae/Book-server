
import * as reviewRepository from '../repository/reviewRepository.js';

export async function setReview(req, res) {
    let { title, score, user_id, book_id } = req.body.data;
    const result = await reviewRepository.setReview(user_id,book_id,title,score);
    res.json(result);
}
