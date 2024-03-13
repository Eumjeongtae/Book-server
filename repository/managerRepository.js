import { db } from '../db/database.js';

// 관리자 권한 확인 후 책 정보 가져옴
export async function authorityCheck(id_idx) {
    // 먼저 사용자의 권한을 확인합니다.
    const [userRows] = await db.execute(`SELECT authority FROM User WHERE id_idx = ?;`, [id_idx]);

    // 만약 사용자가 관리자 권한을 가지고 있다면, Book 테이블에서 책 정보를 가져옵니다/ 책이 중복되면 안됌
    if (userRows[0] && userRows[0].authority === 1) {
        // 모든 책 정보 조회
        const [allBooks] = await db.execute(`SELECT B.id, B.book_name, B.genre, B.income_date, B.status FROM Book B`);
        const [bookHistory] = await db.execute(
            `SELECT U.name, U.email, B.id AS book_id, B.book_name, B.income_date, RH.expected_return_date, B.status
            FROM RentalHistory RH
            INNER JOIN (
                SELECT book_id, MAX(id) AS max_id
                FROM RentalHistory
                GROUP BY book_id
            ) AS LT ON RH.book_id = LT.book_id AND RH.id = LT.max_id
            LEFT JOIN Book B ON B.id = RH.book_id
            LEFT JOIN User U ON U.id_idx = RH.user_id
            ORDER BY book_id DESC;
        
        
        `
        );
        return { allBooks, bookHistory };
    } else {
        // 관리자 권한이 없는 경우, 적절한 메시지나 비어있는 배열을 반환할 수 있습니다.
        return false; // 혹은 []
    }
}

// 새로운 책 등록

export async function newBook(
    book_name,
    author,
    image,
    publisher,
    publication_date,
    income_type,
    income_method,
    income_date,
    genre,
    status,
    memo
) {
    let sql = `INSERT INTO Book (book_name, author, image, publisher, publication_date,income_type,income_method,income_date,genre,status,memo)
                  VALUES (?,?,?,?,?,?,?,?,?,?,?);`;

    return db
        .execute(sql, [
            book_name,
            author,
            image,
            publisher,
            publication_date,
            income_type,
            income_method,
            income_date,
            genre,
            status,
            memo,
        ])
        .then((result) => 'success');
}
export async function modifyBook(
    book_name,
    author,
    image,
    publisher,
    publication_date,
    income_type,
    income_method,
    income_date,
    genre,
    status,
    memo,
    id
) {
    let sql = `UPDATE Book SET book_name=?, 
    author=?, image=?, publisher=?,
     publication_date=?, income_type=?, income_method=?, 
     income_date=?, genre=?, status=?, memo=? WHERE id = ?`;
    return db
        .execute(sql, [
            book_name,
            author,
            image,
            publisher,
            publication_date,
            income_type,
            income_method,
            income_date,
            genre,
            status,
            memo,
            id,
        ])
        .then((result) => 'success');
}
export async function bookEdit(id_idx, book_id) {
    // 사용자 권한 확인
    const [userRows] = await db.execute(`SELECT authority FROM User WHERE id_idx = ?;`, [id_idx]);

    // 관리자 권한이 있는 경우
    if (userRows[0] && userRows[0].authority === 1) {
        // 책 정보 조회
        const [bookRows] = await db.execute(`SELECT * FROM Book WHERE id = ?;`, [book_id]);

        // 대여 기록 중 대여일시와 반납 예정일만 조회
        const [rentalHistory] = await db.execute(
            `
            SELECT RH.rent_date, RH.return_date, U.name AS borrower_name
            FROM RentalHistory RH
            LEFT JOIN User U ON U.id_idx = RH.user_id
            WHERE RH.book_id = ?
            ORDER BY RH.id ASC;
        `,
            [book_id]
        );

        // 책 정보와 필터링된 대여 기록 함께 반환
        return {
            book: bookRows[0] ? bookRows : false, // 책 정보가 있으면 반환, 없으면 false 반환
            rentalHistory: rentalHistory.length > 0 ? rentalHistory : false, // 필터링된 대여 기록이 있으면 반환, 없으면 false 반환
        };
    } else {
        return false; // 관리자 권한이 없으면 false 반환
    }
}

export async function deleteBook(id) {
    const sql = `DELETE FROM Book  WHERE id=? `;

    return db.execute(sql, [id]).then((result) => 'success');
}
