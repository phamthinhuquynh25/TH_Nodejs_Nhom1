import express from "express"
import HomeController from "../controllers/HomeController.js"
import UserController from "../controllers/UserController.js"
import SanPhamController from "../controllers/SanPhamController.js"
import ThuongHieuController from "../controllers/ThuongHieuController.js"

const router = express.Router()
const initWebRouter = (app) => {
    router.get('/', HomeController.getHomePage)
    router.get('/list-sanpham', SanPhamController.getAllSanPham)
    router.get('/list-sanpham/:id', SanPhamController.detailSanPham)
    router.get('/detail-hieunuochoa/:idThuongHieu', SanPhamController.hieuNuocHoa)
    router.get('/list-nuochoanam', SanPhamController.nuochoanam)
    router.get('/list-nuochoanu', SanPhamController.nuochoannu)
    router.get('/login', UserController.login)
    router.post('/login', UserController.login)
    router.get('/logout', UserController.logout)
    router.get('/signup', UserController.signup)
    router.get('/admin-danhmuc', ThuongHieuController.getAllDanhMuc)
    router.get('/update-danhmuc/:idThuongHieu', ThuongHieuController.updateDanhMuc)
    router.post('/suadanhmuc/', ThuongHieuController.suaDanhMuc)
    router.get('/insert-danhmuc', ThuongHieuController.insertDanhMuc)
    router.post('/themdanhmuc', ThuongHieuController.themDanhMuc)
    router.get('/delete-danhmuc/:id', ThuongHieuController.xoaDanhMuc)
    router.get('/admin-sanpham', SanPhamController.dsSanPham)
    router.get('/update-sanpham/:id', SanPhamController.updateSanPham)
    router.post('/update-sanpham/', SanPhamController.updateSanPham)
    router.get('/insert-sanpham', SanPhamController.insertSanPham)
    router.post('/insert-sanpham', SanPhamController.insertSanPham)
    router.get('/delete-sanpham/:id', SanPhamController.xoaSanPham)
    router.get('/detail-sanpham/:id', SanPhamController.adminDetailSanPham)
    router.get('/admin-taikhoan', UserController.dsTaiKhoan)
    router.get('/admin-taikhoan/:id', UserController.detailTaiKhoan)
    router.post('/insert-taikhoan', UserController.insertTaiKhoan)
    router.get('/update-taikhoan/:id', UserController.updateTaiKhoan)
    router.post('/update-taikhoan/', UserController.updateTaiKhoan)
    router.get('/delete-taikhoan/:id', UserController.deleteTaiKhoan)
    router.get('/hoantac-taikhoan/:id', UserController.deleteTaiKhoan)



    router.get('*', (req, res) => {
        res.send("Lỗi 404, không tìm thấy trang")
    })
    return app.use('/', router)
}
export default initWebRouter