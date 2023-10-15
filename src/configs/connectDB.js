import mysql from "mysql2"
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ban_nuoc_hoa',
    password: ''
})
const connection = pool.promise()
export default connection