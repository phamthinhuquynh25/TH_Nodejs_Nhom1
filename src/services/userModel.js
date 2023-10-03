import pool from '../config/connectDB'
const getAllUser = async () =>{
    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return rows
}
export default { getAllUser}

const detaiUser = async (user) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` where user=?', [user])
    return rows[0]
}