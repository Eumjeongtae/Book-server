import { db } from '../db/database.js';

/* 로그인 */
// 로그인 한 id가 있으면 해당하는 cnt값 1 과 해당하는 id의 비밀번호 , 이베일 , id_idx값
export async function login(id) {
    return db
        .execute(
            `
    SELECT 
  COUNT(password) AS cnt, 
  ANY_VALUE(password) AS password, 
  ANY_VALUE(email) AS email,
  ANY_VALUE(id_idx) AS id_idx, 
  ANY_VALUE(authority) AS authority 
FROM User 
WHERE id = ?
`,
            [id]
        )
        .then((rows) => rows[0][0]);
}

