import mysql from "mysql2";
import 'dotenv/config';



// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// })



export const db = mysql.createConnection({
  host: process.env.SPECIAL_HOST,
  user: process.env.SPECIAL_USER,
  password: process.env.SPECIAL_PASSWORD,
  database: process.env.SPECIAL_DB_NAME
}) 