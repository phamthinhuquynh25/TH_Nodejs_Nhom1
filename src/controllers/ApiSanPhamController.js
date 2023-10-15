import SanPhamModel from "../services/SanPhamModel.js"
import ThuongHieuModel from "../services/ThuongHieuModel.js"

const checkSanPhamExist = async (id) => {
    const idSanPham = await SanPhamModel.detailSanPham(parseInt(id))
    if (idSanPham) {
        return true
    } else {
        return false
    }
}
const getAllSanPham = async (req, res) => {
    try {
        const listSanPham = await SanPhamModel.getAllSanPham()
        return res.status(200).json({
            errCode: 1,
            message: "Sucess",
            listSanPham: listSanPham,
        })
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const createSanPham = async (req, res) => {
    try {
        let { tensp, hinh, gia, gioitinh, idhieusp } = req.body
        const idthuonghieu = await ThuongHieuModel.detailThuongHieu(idhieusp)
        if (tensp != null && hinh != null && gia != null && gioitinh != null && idhieusp != null) {
            if (idthuonghieu) {
                await SanPhamModel.insertSanPham(tensp, hinh, gia, gioitinh, idhieusp)
                return res.status(200).json({
                    errCode: 1,
                    message: "Sucess",
                })
            } else {
                return res.status(200).json({
                    errCode: 5,
                    message: "Thương hiệu không tồn tài!",
                })
            }
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
const updateSanPham = async (req, res) => {
    try {
        let { tensp, hinh, gia, gioitinh, idhieusp, id } = req.body
        if (await checkSanPhamExist(id)) {
            if (tensp != null && hinh != null && gia != null && gioitinh != null && idhieusp != null && id != null) {
                let idthuonghieu = await ThuongHieuModel.detailThuongHieu(idhieusp)
                if (idthuonghieu) {
                    await SanPhamModel.updateSanPham(tensp, hinh, gia, gioitinh, idhieusp, id)
                    let sanpham = await SanPhamModel.detailSanPham(id)
                    return res.status(200).json({
                        errCode: 1,
                        message: "Sucess",
                        SanPham: sanpham
                    })
                } else {
                    return res.status(200).json({
                        errCode: 2,
                        message: "Thương hiệu không tồn tài!",
                    })
                }

            } else {
                return res.status(200).json({
                    errCode: 3,
                    message: "Lack of information!",
                })
            }
        } else {
            return res.status(200).json({
                errCode: 5,
                message: "Không tìm thấy sản phẩm!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const deleteSanPham = async (req, res) => {
    try {
        let id = req.params.id
        if (await checkSanPhamExist(id)) {
            await SanPhamModel.xoaSanPham(id)
            return res.status(200).json({
                errCode: 1,
                message: "Delete sucess!",
            })
        } else {
            return res.status(200).json({
                errCode: 1,
                message: "Không tìm thấy sản phẩm!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}

export default { getAllSanPham, createSanPham, updateSanPham, deleteSanPham, checkSanPhamExist }