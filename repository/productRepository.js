import { db } from "../db/database.js";

export async function getList() {
  const sql = `  
  SELECT  * FROM User
`

  return db
    .execute(sql)
    .then((result) =>  result[0])
}