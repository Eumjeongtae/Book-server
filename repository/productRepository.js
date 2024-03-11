import { db } from '../db/database.js';

//책 리스트
export async function getList(genre, startIndex, endIndex) {
    let sql = '';

    const limit = endIndex - startIndex + 1; // 필요한 행 수
    const offset = startIndex - 1; // OFFSET을 계산합니다. SQL은 0부터 시작합니다.

    let totalBooksParams = null;
    let params = [];

    // 전체 책의 수를 조회하는 쿼리
    let totalBooksQuery = null;

    if (genre > 0) {
        totalBooksParams = [genre];
        totalBooksQuery = 'SELECT COUNT(*) AS total FROM Book WHERE genre = ?';
        params = [genre, limit, offset];
        sql = `SELECT book_name, author, image, id AS book_id, genre FROM Book WHERE genre = ? ORDER BY id ASC LIMIT ? OFFSET ?`;
    } else {
        totalBooksQuery = 'SELECT COUNT(*) AS total FROM Book';
        params = [limit, offset];
        sql = `SELECT book_name, author, image, id AS book_id, genre FROM Book ORDER BY id ASC LIMIT ? OFFSET ?;`;
    }

    // 전체 책의 수 또는 특정 장르의 책의 수 조회
    const totalBooksResult = await db.execute(totalBooksQuery, totalBooksParams);

    // 페이지 데이터 조회
    const pageDataResult = await db.execute(sql, params);
    return {
        total: totalBooksResult[0][0].total,
        books: pageDataResult[0],
    };
}

// export async function getList(genre ,startIndex , endIndex) {
//     let sql = ``;
//     if (genre > 0) {
//         sql = `SELECT  book_name,author,image,id AS book_id,genre FROM Book where genre = ? `;
//         // sql = `SELECT  * FROM Genre`
//     } else {
//         sql = `SELECT  book_name,author,image,id AS book_id,genre FROM Book`;
//         // sql = `SELECT  * FROM User`
//     }

//     return db.execute(sql, [genre ,startIndex , endIndex]).then((result) => result[0]);
// }

// 책 상세정보
export async function getDetail(uid, id) {
    // 책에 대한 상세 내용
    const bookDetails = await db.execute('SELECT * FROM Book B WHERE B.id = ?', [id]);

    // 좋아요의 총개수, 로그인 유저가 좋아요했는지 여부
    const likesDetails = await db.execute(
        `
    SELECT
      (SELECT COUNT(*) FROM UserBookLike WHERE book_id = ?) AS total_likes,
      (SELECT COUNT(*) FROM UserBookLike WHERE book_id = ? AND user_id = ?) AS user_likes
  `,
        [id, id, uid]
    );

    // 책 최신 대여 이력 확인
    const rentalHistory = await db.execute(
        `
    SELECT * FROM RentalHistory RH
    WHERE RH.book_id = ?
    ORDER BY RH.id DESC
    LIMIT 1
  `,
        [id]
    );

    // 책 최신 예약 상태 확인
    const bookReservation = await db.execute(
        `
    SELECT BRV.reservation_status FROM BookReservation BRV
    WHERE BRV.user_id = ? AND BRV.book_id = ?
    ORDER BY BRV.id DESC
    LIMIT 1
  `,
        [uid, id]
    );

    // 책 리뷰
    const bookReviews = await db.execute(
        `
        SELECT 
        BR.title, 
        BR.content,
        BR.score,
        BR.user_id,
        U.email
      FROM 
        BookReview BR
      JOIN 
        User U ON BR.user_id = U.id_idx
      WHERE 
        BR.book_id = ?;
      
  `,
        [id]
    );

    return {
        bookDetails: bookDetails[0][0],
        likesDetails: likesDetails[0][0],
        rentalHistory: rentalHistory[0][0],
        bookReservation: bookReservation[0][0],
        bookReviews: bookReviews[0],
    };
}

// export async function getDetail(uid, id) {
//     let sql = `
//   SELECT
//   b.*,
//   COUNT(ubl.user_id) AS like_count,
//   CASE
//       WHEN EXISTS (
//           SELECT 1
//           FROM UserBookLike ubl2
//           WHERE ubl2.book_id = b.id AND ubl2.user_id = ?
//       ) THEN TRUE
//       ELSE FALSE
//   END AS user_liked
// FROM Book b
// LEFT JOIN UserBookLike ubl ON b.id = ubl.book_id
// WHERE b.id = ?
// GROUP BY b.id;
// `;

//     return db.execute(sql, [uid, id]).then((result) => result[0]);
// }

// 지금있는 페이지의 책을 유저가 예약 했는지
// export async function getRervation(uid, id) {
//     let sql = `SELECT *
//     FROM BookReservation
//     WHERE user_id = ? AND book_id = ? AND reservation_status = 0;

// `;
//     return db.execute(sql, [uid, id]).then((result) => result[0]);
// }

// 지금있는 페이지의 책이 대여중이라면 대여중인 유저
// export async function getRentHistory(id) {
//     let sql = `SELECT user_id
//   FROM RentalHistory
//   WHERE book_id = ? and return_status = 0;
// `;

//     return db.execute(sql, [id]).then((result) => result[0]);
// }

// 지금있는 페이지의 책 리뷰들
// export async function getReview(id) {
//     let sql = `
// SELECT br.user_id, br.title, br.score, u.id
// FROM BookReview br
// JOIN User u ON br.user_id = u.id_idx
// WHERE br.book_id = ?;
// `;

//     return db.execute(sql, [id]).then((result) => result[0]);
// }

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
    // Step 1: 먼저, 예약 중인 로우가 있는지 확인
    let checkSql = `
    SELECT * FROM BookReservation
    WHERE user_id = ? AND book_id = ? AND reservation_status = 0;
  `;

    const [existingReservations] = await db.execute(checkSql, [user_id, book_id]);

    // Step 2: 예약 중인 로우가 있으면, cancel_at을 업데이트하고 reservation_status를 1로 변경
    if (existingReservations.length > 0) {
        let updateSql = `
      UPDATE BookReservation
      SET cancel_at = ?, reservation_status = 1
      WHERE user_id = ? AND book_id = ? AND reservation_status = 0;
    `;
        await db.execute(updateSql, [rent_date, user_id, book_id]);
    }

    // Step 3: 새 대여 기록 추가
    let insertSql = `
    INSERT INTO RentalHistory (user_id, book_id, rent_date, expected_return_date)
    VALUES (?, ?, ?, ?);
  `;
    await db.execute(insertSql, [user_id, book_id, rent_date, expected_return_date]);

    // 책 상태 업데이트
    let sqlUpdateBookStatus = `
  UPDATE Book
  SET status = 1 
  WHERE id = ?;
`;

    await db.execute(sqlUpdateBookStatus, [book_id]);

    return 'success';
}

//유저아이디와 책아이디를 받고  return_status가 대여중인 책반납
export async function bookReturn(user_id, book_id) {
    // 책 반납 처리
    let returnSql = `
    UPDATE RentalHistory
    SET return_status = 1, return_date = NOW()
    WHERE user_id = ? AND book_id = ? AND return_status = 0;
  `;
    await db.execute(returnSql, [user_id, book_id]);

    // Book 테이블의 status를 0(대여 가능)으로 업데이트
    let updateBookStatusSql = `
    UPDATE Book
    SET status = 0
    WHERE id = ?;
  `;
    await db.execute(updateBookStatusSql, [book_id]);

    return 'success';
}

export async function bookReservation(user_id, book_id, created_at) {
    let sql = `
INSERT INTO BookReservation (user_id, book_id,created_at,cancel_at)
VALUES
(?, ?, ?,null);
`;
    //   let sql = `
    // select * from BookReservation;
    //   `

    return db.execute(sql, [user_id, book_id, created_at]).then((result) => 'success');
    // return db.execute(sql, []).then((result) => result[0]);
}
export async function bookReservationCancel(cancel_at, user_id, book_id) {
    let sql = `
    UPDATE BookReservation
    SET
      cancel_at = ?,
      reservation_status = 1
    WHERE
      user_id = ? AND
      book_id = ? AND
      reservation_status = 0;
`;
    //   let sql = `
    // select * from BookReservation;
    //   `

    return db.execute(sql, [cancel_at, user_id, book_id]).then((result) => 'success');
    // return db.execute(sql, []).then((result) => result[0]);
}

// 마이페이지 책반납 이력
export async function myPageReturnHistory(user_id) {
    let sql = `
    SELECT 
      rh.book_id, 
      rh.rent_date, 
      rh.return_date, 
      b.image AS image, 
      b.author AS author,
      b.book_name AS book_name
    FROM 
      RentalHistory rh
    JOIN 
      Book b ON rh.book_id = b.id
    WHERE 
      rh.user_id = ? AND rh.return_status = 1;
  `;

    return db.execute(sql, [user_id]).then((result) => result[0]);
}
// 마이페이지 책대여 이력
export async function myPageRentHistory(user_id) {
    let sql = `
    SELECT 
      rh.book_id, 
      rh.expected_return_date, 
      b.image AS image, 
      b.author AS author,
      b.book_name AS book_name
    FROM 
      RentalHistory rh
    JOIN 
      Book b ON rh.book_id = b.id
    WHERE 
      rh.user_id = ? AND rh.return_status = 0;
  `;

    return db.execute(sql, [user_id]).then((result) => result[0]);
}

// 마이페이지 예약책
export async function myPageReserve(user_id) {
    let sql = `

    SELECT 
    b.id AS book_id,
    b.book_name,
    b.status AS book_status,
    MAX(rh.expected_return_date) AS expected_return_date
FROM 
    BookReservation br
JOIN 
    Book b ON br.book_id = b.id
LEFT JOIN 
    RentalHistory rh ON b.id = rh.book_id AND rh.return_status = 0
WHERE 
    br.user_id = ? AND br.reservation_status = 0
GROUP BY 
    b.id, b.book_name, b.status;







  `;

    return db.execute(sql, [user_id]).then((result) => result[0]);
}
