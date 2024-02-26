import { db } from '../db/database.js';

// 리뷰 리스트
export async function setReview(user_id, book_id, title, score) {
    // let sql = `select * from BookReview;`;
    let sql = `INSERT INTO BookReview (user_id, book_id, title, content, score)
              VALUES (?, ?, ?, NULL, ?);`;

    return db.execute(sql, [user_id, book_id, title, score]).then((result) => 'success');
    // return db.execute(sql, []).then((result) => result[0]);
}
