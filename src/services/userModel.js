import pool from "../configs/connectDB.js";
const getAllUser = async () => {
    const [rows, fields] = await pool.execute('SELECT tk.* , r.id as idRole ,r.role FROM `taikhoan` tk, `role` r WHERE tk.quyen = r.id')
    return rows
}
const idUser = async (id) => {
    const [rows, fields] = await pool.execute('SELECT tk.* , r.id as idRole,r.role FROM `taikhoan` tk, `role` r WHERE tk.quyen = r.id AND tk.id=?', [id])
    return rows[0]
}
const userName = async (user) => {
    const [rows, fields] = await pool.execute('SELECT tk.* , r.id as idRole,r.role FROM `taikhoan` tk, `role` r WHERE tk.quyen = r.id AND tk.user=?', [user])
    return rows[0]
}
const insertTaiKhoan = async (tendk, email, user, pass) => {
    await pool.execute('INSERT INTO taikhoan(tendk, email, user, pass) VALUE(?,?,?,?)', [tendk, email, user, pass])

}
const updateTaiKhoan = async (tendk, email, user, quyen, id) => {
    await pool.execute('UPDATE taikhoan SET tendk=?, email=?, user=?, quyen=? WHERE id=?', [tendk, email, user, quyen, id])

}
const deleteTaiKhoan = async (trangthai, id) => {
    await pool.execute('UPDATE taikhoan SET trangthai=? WHERE id=?', [trangthai, id])

}

export default { getAllUser, insertTaiKhoan, idUser, updateTaiKhoan, deleteTaiKhoan, userName }