import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'th_nodejs_nhom1',
    password: ''
});

const connection = pool.promise();
export default connection