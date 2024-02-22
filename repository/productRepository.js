import { db } from '../db/database.js';

export async function getList(genre) {
    let sql = ``;
    if (genre) {
        sql = `SELECT  book_name,author,image,id,genre FROM Book where genre = ? `;
    } else {
        sql = `SELECT  book_name,author,image,id,genre FROM Book`;
        // sql = `SELECT  * FROM User`
    }

    return db.execute(sql, [genre ? genre : '']).then((result) => result[0]);
}
// 책정보 , post받은 책id의 책 좋아요 갯수 , post받은 id의 좋아요 여부
export async function getDetail(uid, id) {
    let sql = `
  SELECT 
  b.book_name,
  b.author,
  b.image,
  b.id,
  b.genre,
  b.publisher,
  b.publication_date,
  b.memo,
  COUNT(ubl.user_id) AS like_count,
  CASE
      WHEN EXISTS (
          SELECT 1
          FROM UserBookLike ubl2
          WHERE ubl2.book_id = b.id AND ubl2.user_id = ?
      ) THEN TRUE
      ELSE FALSE
  END AS user_liked
FROM Book b
LEFT JOIN UserBookLike ubl ON b.id = ubl.book_id
WHERE b.id = ?
GROUP BY b.id;
`;

    return db.execute(sql, [uid, id]).then((result) => result[0]);
}

//
export async function getRentHistory(id) {
    let sql = `SELECT user_id, return_status
  FROM RentalHistory
  WHERE book_id = ? and return_status = 0;
`;

    return db.execute(sql, [id]).then((result) => result[0]);
}

//책 좋아요
export async function bookLike(user_id, book_id) {
    let sql = `
  INSERT INTO UserBookLike (user_id, book_id)
  VALUES (?, ?) ; 
  `;

    return db.execute(sql, [user_id, book_id]).then((result) => 'success');
}

//책 좋아요 취소
export async function bookUnLike(user_id, book_id) {
    let sql = `
  DELETE FROM UserBookLike
WHERE user_id = ? AND book_id = ? ; 
  `;

    return (
        db
            // .execute(sql, [])
            .execute(sql, [user_id, book_id])
            .then((result) => 'success')
    );
}

//책대여
export async function bookRent(user_id, book_id, rent_date, expected_return_date) {
    //   let sql = `
    // select * from RentalHistory;
    //   `
    let sql = `
  INSERT INTO RentalHistory (user_id, book_id, rent_date, expected_return_date)
VALUES
(?, ?, ?, ?);
  `;

    return db.execute(sql, [user_id, book_id, rent_date, expected_return_date]).then((result) => 'success');
}
//책반납
export async function bookReturn(user_id, book_id) {
    let sql = `
    UPDATE RentalHistory
    SET return_status = 1
    WHERE user_id = ? AND book_id = ? AND return_status = 0;
  `;

    return db.execute(sql, [user_id, book_id]).then((result) => 'success');
}
