import { db } from "../db/database.js";

export async function getUserId(id) {
  const sql = `  
  select count(id) as cnt from User where id = ?
`

  return db
    .execute(sql, [id])
    .then((result) => result[0][0])
}

export async function getUserEmail(email) {
  const sql = `  
  select count(id) as cnt from User where email = ?
`

  return db
    .execute(sql, [email])
    .then((result) => result[0][0])
}

export async function insertUser(id, password, email, name ){
  console.log({ id, password, email, name });
  const sql = 'insert into User(id, password, email, name, login_type, authority) values(?, ?, ?, ?, 3, 0)';

  return db
  .execute(sql,[ id, password, email, name ])
  .then((result) => 'good')
}