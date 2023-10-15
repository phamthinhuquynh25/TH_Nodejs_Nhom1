import pool from "../configs/connectDB.js";
const getAllRole = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `role`')
    return rows
}
export default { getAllRole }