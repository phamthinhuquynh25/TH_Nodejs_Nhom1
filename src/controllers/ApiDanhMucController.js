import ThuongHieuModel from "../services/ThuongHieuModel.js"
import SanPhamModel from "../services/SanPhamModel.js"

const checkDanhMucExist = async (id) => {
    const idThuongHieu = await ThuongHieuModel.detailThuongHieu(id)
    if (idThuongHieu) {
        return true
    } else {
        return false
    }
}
const getAllDanhMuc = async (req, res) => {
    try {
        let danhmuc = await ThuongHieuModel.getAllThuongHieu()
        return res.status(200).json({
            errCode: 1,
            message: "Sucess",
            danhmuc: danhmuc
        })
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const createDanhMuc = async (req, res) => {
    try {
        let { tenhieu, hinhhieu, thutu, noibat } = req.body
        if (tenhieu != null && hinhhieu != null && thutu != null && noibat != null) {
            let danhmuc = await ThuongHieuModel.themDanhMuc(tenhieu, hinhhieu, thutu, noibat)
            return res.status(200).json({
                errCode: 1,
                message: "Sucess",
            })
        } else {
            return res.status(200).json({
                errCode: 2,
                message: "Lack of information!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const updateDanhMuc = async (req, res) => {
    try {
        let { tenhieu, hinhhieu, thutu, noibat, id } = req.body
        if (await checkDanhMucExist(id)) {
            if (tenhieu != null && hinhhieu != null && thutu != null && noibat != null && id != null) {
                await ThuongHieuModel.suaDanhMuc(tenhieu, hinhhieu, thutu, noibat, id)
                let danhmuc = await ThuongHieuModel.detailThuongHieu(id)
                return res.status(200).json({
                    errCode: 1,
                    message: "Update sucess!",
                    danhmuc: danhmuc
                })
            } else {
                return res.status(200).json({
                    errCode: 2,
                    message: "Lack of information!",
                })
            }
        } else {
            return res.status(200).json({
                errCode: 1,
                message: "Không tìm thấy danh mục!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const deleteDanhMuc = async (req, res) => {
    try {
        let id = req.params.id
        if (await checkDanhMucExist(id)) {
            let sanpham = await SanPhamModel.getAllSanPham()
            let result = true
            for (let i = 0; i < sanpham.length; i++) {
                if (sanpham[i].idhieusp == req.params.id) {
                    result = false
                    break
                }
            }
            if (result == true) {
                await ThuongHieuModel.deleteDanhMuc(id)
                return res.status(200).json({
                    errCode: 2,
                    message: "Delete sucess!",
                })
            } else {
                return res.status(200).json({
                    errCode: 1,
                    message: "Delete not sucess!",
                })
            }
        } else {
            return res.status(200).json({
                errCode: 3,
                message: "Không tìm thấy danh mục!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}

export default { getAllDanhMuc, createDanhMuc, updateDanhMuc, deleteDanhMuc, checkDanhMucExist }