import express from "express"
import SanPhamModel from "../services/SanPhamModel.js"
import ThuongHieuModel from "../services/ThuongHieuModel.js"

let session = {};
const getAllSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listSanPham = await SanPhamModel.getAllSanPham()
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    res.render("layout/mainView",
        {
            data:
            {
                title: "Sản phẩm",
                page: "../trangchu/SanPhamView",
                rows: listSanPham,
                item: listThuongHieu,
                session: session
            }
        })
}
const detailSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const idSanPham = req.params.id
    const detailSanPham = await SanPhamModel.detailSanPham(idSanPham)
    res.render("layout/mainView",
        {
            data:
            {
                title: "Chi tiết sản phẩm",
                page: "../trangchu/detailSanPham",
                rows: detailSanPham,
                session: session
            }
        })
}
const nuochoanam = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listNuocHoaNam = await SanPhamModel.getLoaiSanPhamNam()
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    res.render("layout/mainView",
        {
            data:
            {
                title: "Nước hoa nam",
                page: "../trangchu/SanPhamView",
                rows: listNuocHoaNam,
                item: listThuongHieu,
                tieude: "NAM",
                session: session

            }
        })
}
const nuochoannu = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listNuocHoaNu = await SanPhamModel.getLoaiSanPhamNu()
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    res.render("layout/mainView",
        {
            data:
            {
                title: "Nước hoa nữ",
                page: "../trangchu/SanPhamView",
                rows: listNuocHoaNu,
                item: listThuongHieu,
                tieude: "NỮ",
                session: session
            }
        })
}

const hieuNuocHoa = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const idThuongHieu = req.params.idThuongHieu
    const listSanPham = await SanPhamModel.hieuNuocHoa(idThuongHieu)
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    let thuonghieu;
    for (let i = 0; i < listThuongHieu.length; i++) {
        if (parseInt(idThuongHieu) === listThuongHieu[i].id) {
            thuonghieu = listThuongHieu[i].tenhieu
            break
        }
    }
    console.log(thuonghieu)
    res.render("layout/mainView",
        {
            data:
            {
                title: "Thương hiệu",
                page: "../trangchu/SanPhamView",
                rows: listSanPham,
                item: listThuongHieu,
                tieude: thuonghieu,
                session: session
            }
        })
}
//ADMIN
const dsSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listSanPham = await SanPhamModel.getAllSanPham()
    res.render("layout/mainView",
        {
            data:
            {
                title: "Danh sách sản phẩm",
                page: "../sanpham/dsSanPham",
                rows: listSanPham,
                tieude: "SẢN PHẨM",
                session: session
            }
        })
}
const adminDetailSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user

        const id = req.params.id
        const detailSanPham = await SanPhamModel.detailSanPham(id)
        res.render("layout/mainView",
            {
                data:
                {
                    title: "Chi tiết sản phẩm",
                    page: "../sanpham/admindetailSanPham",
                    rows: detailSanPham,
                    tieude: "CHI TIẾT SẢN PHẨM",
                    session: session
                }
            })
    } else {
        delete session.user;
        res.redirect("/")
    }

}
const updateSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    if (req.method === "POST") {
        let { tensp, hinh, gia, gioitinh, idhieusp, id } = req.body
        await SanPhamModel.updateSanPham(tensp, hinh, gia, gioitinh, idhieusp, id)
        res.redirect("/admin-sanpham")

    } else {
        let id = req.params.id
        const thuonghieu = await ThuongHieuModel.getAllThuongHieu()
        const idsanpham = await SanPhamModel.detailSanPham(id)
        return res.render("layout/mainView",
            {
                data:
                {
                    title: "Cập nhật sản phẩm",
                    page: "../sanpham/updateSanPham",
                    rows: idsanpham,
                    tieude: "CẬP NHẬT SẢN PHẨM",
                    item: thuonghieu,
                    session: session
                }
            })

    }

}
const insertSanPham = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    if (req.method === "POST") {
        let { tensp, hinh, gia, gioitinh, idhieusp } = req.body
        await SanPhamModel.insertSanPham(tensp, hinh, gia, gioitinh, idhieusp)
        res.redirect("/admin-sanpham")
    } else {
        const thuonghieu = await ThuongHieuModel.getAllThuongHieu()
        return res.render("layout/mainView",
            {
                data:
                {
                    title: "Thêm sản phẩm",
                    page: "../sanpham/insertSanPham",
                    tieude: "THÊM SẢN PHẨM",
                    item: thuonghieu,
                    session: session
                }
            })

    }

}
const xoaSanPham = async (req, res) => {

    let id = req.params.id
    await SanPhamModel.xoaSanPham(id)
    res.redirect("/admin-sanpham")

}
export default { getAllSanPham, detailSanPham, nuochoanam, nuochoannu, hieuNuocHoa, dsSanPham, adminDetailSanPham, updateSanPham, insertSanPham, xoaSanPham }