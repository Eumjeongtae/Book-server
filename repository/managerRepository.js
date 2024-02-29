import { db } from '../db/database.js';

// 관리자 권한 확인 후 책 정보 가져옴
export async function authorityCheck(id_idx) {
    // 먼저 사용자의 권한을 확인합니다.
    const [userRows] = await db.execute(`SELECT authority FROM User WHERE id_idx = ?;`, [id_idx]);

    // 만약 사용자가 관리자 권한을 가지고 있다면, Book 테이블에서 책 정보를 가져옵니다.
    if (userRows[0] && userRows[0].authority === 1) {
        const [bookRows] = await db.execute(
            `SELECT 
            b.id AS book_id,
            b.book_name,
            b.income_date,
            b.status,
            rh.expected_return_date
        FROM 
            Book b
        LEFT JOIN 
            (SELECT book_id, expected_return_date FROM RentalHistory WHERE return_status = 0) AS rh ON b.id = rh.book_id
        ORDER BY 
            b.income_date DESC;
        
        
        `
        );
        return bookRows;
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

export async function bookEdit(id_idx, book_id) {
    // 사용자 권한 확인
    const [userRows] = await db.execute(`SELECT authority FROM User WHERE id_idx = ?;`, [id_idx]);

    // 관리자 권한이 있는 경우
    if (userRows[0] && userRows[0].authority === 1) {
        // 책 정보 조회
        const [bookRows] = await db.execute(`SELECT * FROM Book WHERE id = ?;`, [book_id]);

        // 대여 기록 중 대여일시와 반납 예정일만 조회
        const [rentalHistory] = await db.execute(`
            SELECT 
                RentalHistory.rent_date,
                RentalHistory.return_date,
                User.name AS borrower_name
            FROM 
                RentalHistory
            INNER JOIN 
                User ON RentalHistory.user_id = User.id_idx
            WHERE 
                RentalHistory.book_id = ?;
        `, [book_id]);

        // 책 정보와 필터링된 대여 기록 함께 반환
        return {
            book: bookRows[0] ? bookRows : false, // 책 정보가 있으면 반환, 없으면 false 반환
            rentalHistory: rentalHistory.length > 0 ? rentalHistory : false // 필터링된 대여 기록이 있으면 반환, 없으면 false 반환
        };
    } else {
        return false; // 관리자 권한이 없으면 false 반환
    }
}

