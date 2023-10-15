import express from 'express'
import ApiUserController from '../controllers/ApiUserController.js'
import ApiDanhMucController from '../controllers/ApiDanhMucController.js'
import ApiSanPhamController from '../controllers/ApiSanPhamController.js'
// import auth from './../middleware/auth.js'

const router = express.Router()
const initAPIRoute = (app) => {
    router.get('/get-all-users', ApiUserController.getAllUser)
    router.get('/detail-user/:user', ApiUserController.detailUser)
    router.post('/create-user', ApiUserController.createUser)
    router.put('/update-user', ApiUserController.updateUser)
    router.delete('/delete-user/:user', ApiUserController.deleteUser)
    router.get('/get-all-danhmuc', ApiDanhMucController.getAllDanhMuc)
    router.post('/create-danhmuc', ApiDanhMucController.createDanhMuc)
    router.put('/update-danhmuc', ApiDanhMucController.updateDanhMuc)
    router.delete('/delete-danhmuc/:id', ApiDanhMucController.deleteDanhMuc)
    router.get('/get-all-sanpham', ApiSanPhamController.getAllSanPham)
    router.post('/create-sanpham', ApiSanPhamController.createSanPham)
    router.put('/update-sanpham', ApiSanPhamController.updateSanPham)
    router.delete('/delete-sanpham/:id', ApiSanPhamController.deleteSanPham)
    router.post('/login', ApiUserController.login)

    // router.get('/logout', ApiUserController.logout)

    return app.use("/api/v1", router)
}
export default initAPIRoute