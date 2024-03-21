import mysql from "mysql2";
import 'dotenv/config';



// export const db = mysql.createConnection({
//   host: process.env.MAC_DB_HOST,
//   user: process.env.MAC_DB_USER,
//   password: process.env.MAC_DB_PASSWORD,
//   database: process.env.MAC_DB_NAME
// })



export const db = mysql.createConnection({
  host: process.env.SPECIAL_HOST,
  user: process.env.SPECIAL_USER,
  password: process.env.SPECIAL_PASSWORD,
  database: process.env.SPECIAL_DB_NAME
}) 