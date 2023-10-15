import pool from "../configs/connectDB.js";
const getAllSanPham = async () => {
    const [rows, fields] = await pool.execute('SELECT sp.*, h.id as idhieu,h.tenhieu FROM `sanpham` sp, `hieunuochoa` h WHERE sp.idhieusp = h.id ')
    return rows
}
const detailSanPham = async (id) => {
    const [rows, fields] = await pool.execute('SELECT sp.*, h.id,h.tenhieu FROM `sanpham` sp, `hieunuochoa` h WHERE sp.idhieusp = h.id AND sp.id=?', [id])
    return rows[0]
}
const getLoaiSanPhamNam = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sanpham` WHERE gioitinh="Nam"')
    return rows
}
const getLoaiSanPhamNu = async () => {
    const [rows, fields] = await pool.execute('SELECT * FROM `sanpham` WHERE gioitinh="Nữ"')
    return rows
}
const hieuNuocHoa = async (idThuongHieu) => {
    const [rows, fields] = await pool.execute('SELECT sp.id , sp.tensp , sp.hinh , sp.gia , sp.gioitinh , sp.ttsanpham , sp.idhieusp , h.tenhieu FROM `sanpham` sp, `hieunuochoa` h WHERE sp.idhieusp = h.id AND sp.idhieusp = ?', [idThuongHieu]);
    return rows;
}
const updateSanPham = async (tensp, hinh, gia, gioitinh, idhieusp, id) => {
    await pool.execute('UPDATE `sanpham` SET tensp=?, hinh=?, gia=?, gioitinh=?, idhieusp=? WHERE id=?', [tensp, hinh, gia, gioitinh, idhieusp, id])

}
const insertSanPham = async (tensp, hinh, gia, gioitinh, idhieusp) => {
    await pool.execute('INSERT INTO `sanpham` (tensp, hinh, gia, gioitinh, idhieusp) VALUE (?,?,?,?,?) ', [tensp, hinh, gia, gioitinh, idhieusp])

}
const xoaSanPham = async (id) => {
    await pool.execute('DELETE FROM `sanpham` WHERE id=? ', [id])

}
export default { getAllSanPham, detailSanPham, getLoaiSanPhamNam, getLoaiSanPhamNu, hieuNuocHoa, updateSanPham, insertSanPham, xoaSanPham }