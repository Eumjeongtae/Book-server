import { db } from '../db/database.js';


export async function authorityCheck(id_idx) {
    // 먼저 사용자의 권한을 확인합니다.
    const [userRows] = await db.execute(
        `SELECT authority FROM User WHERE id_idx = ?;`,
        [id_idx]
    );

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
