import { db } from "../db/database.js";

/* 로그인 */
export async function login(id) {

  return db
    .execute(`
              SELECT 
              COUNT(password) AS cnt, 
              ANY_VALUE(password) AS password, 
              ANY_VALUE(email) AS email,
              ANY_VALUE(id_idx) AS id_idx -- id_idx 컬럼 추가
              FROM User 
              WHERE id = ?
`, [id])
    .then((rows) => rows[0][0])
}