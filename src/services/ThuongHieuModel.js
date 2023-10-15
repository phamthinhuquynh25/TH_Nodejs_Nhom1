import pool from "../configs/connectDB.js";
const getAllThuongHieu = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `hieunuochoa`')
    return rows
}
const detailThuongHieu = async (id) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `hieunuochoa` WHERE id=?', [id])
    return rows[0]
}
const suaDanhMuc = async (tenhieu, hinhhieu, thutu, noibat, idhieu) => {
    await pool.execute('UPDATE hieunuochoa SET tenhieu=?,hinhhieu=?,thutu=?,noibat=? WHERE id=?', [tenhieu, hinhhieu, thutu, noibat, idhieu])

}
const themDanhMuc = async (tenhieu, hinhhieu, thutu, noibat) => {
    await pool.execute('INSERT INTO hieunuochoa (tenhieu, hinhhieu, thutu, noibat) VALUE (?,?,?,?) ', [tenhieu, hinhhieu, thutu, noibat])

}
const xoaDanhMuc = async (id) => {
    await pool.execute('DELETE FROM hieunuochoa WHERE id=?', [id])

}


export default { getAllThuongHieu, detailThuongHieu, suaDanhMuc, themDanhMuc, xoaDanhMuc }