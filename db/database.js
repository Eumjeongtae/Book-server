import mysql from "mysql2";

const pool = mysql.createPool({
  host: "192.168.10.56",
  port: "3306",
  user: "admin",
  password: "qwe123!!",
  database: "bookbooking",
});

export const db= pool.promise()
