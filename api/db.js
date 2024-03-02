import mysql from "mysql2";


export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rbdyd!@0209',
  database: 'special'
})



// export const db = mysql.createConnection({
//   host: '172.19.152.27',
//   user: 'onsdb_jo',
//   password: 'Onsdb123$',
//   database: 'special'
// }) 