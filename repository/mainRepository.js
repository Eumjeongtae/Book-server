import { db } from '../db/database.js';

export async function getMain() {
    // 최신책
    const newBooksSql = `
    SELECT B.id, B.book_name, B.image, B.author
    FROM Book B
    ORDER BY publication_date DESC
    LIMIT 6;
  `;

    // 좋아요 만은순
    const likeCountSql = `
    SELECT B.id, B.book_name, COUNT(UBL.id) AS like_count
    FROM Book B
    LEFT JOIN UserBookLike UBL ON UBL.book_id = B.id
    GROUP BY B.id
    ORDER BY like_count DESC
    LIMIT 9;
    
  `;

    // 많이 빌린 순
    const rentCountSql = `

    SELECT B.id, B.book_name, COUNT(RH.id) AS rent_count
    FROM Book B
    LEFT JOIN RentalHistory RH ON RH.book_id = B.id AND RH.return_status = 1
    GROUP BY B.id
    ORDER BY rent_count DESC
    LIMIT 9;

  `;

    // Execute queries
    const newBooks = await db.execute(newBooksSql).then((result) => result[0]);
    const likeCounts = await db.execute(likeCountSql).then((result) => result[0]);
    const rentCounts = await db.execute(rentCountSql).then((result) => result[0]);

    // Return all results in a single object
    return {
        newBooks,
        likeCounts,
        rentCounts,
    };
}
