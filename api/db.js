import mysql from "mysql2";
import 'dotenv/config';



export const db = mysql.createConnection({
  host: process.env.DB_HOST, // 수정됨
  user: process.env.DB_USER, // 수정됨
  password: process.env.DB_PASSWORD, // 수정됨
  database: process.env.DB_NAME // 수정됨
})



// export const db = mysql.createConnection({
//   host: process.env.SPECIAL_HOST, // 수정됨
//   user: process.env.SPECIAL_USER, // 수정됨
//   password: process.env.SPECIAL_PASSWORD, // 수정됨
//   database: process.env.SPECIAL_DB_NAME // 수정됨
// }) 