import express from "express"
import ThuongHieuModel from "../services/ThuongHieuModel.js"

let session = {}
const getAllDanhMuc = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    res.render("layout/mainView",
        {
            data:
            {
                title: "Danh sách danh mục",
                page: "../danhmuc/dsDanhMuc",
                rows: listThuongHieu,
                tieude: "DANH MỤC",
                session: session
            }
        })
}
const updateDanhMuc = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        let idThuongHieu = req.params.idThuongHieu
        const thuonghieu = await ThuongHieuModel.detailThuongHieu(idThuongHieu)
        res.render("layout/mainView",
            {
                data:
                {
                    title: "Cập nhật danh mục",
                    page: "../danhmuc/updateDanhMuc",
                    rows: thuonghieu,
                    tieude: "CẬP NHẬT DANH MỤC",
                    session: session

                }
            })
    } else {
        delete session.user;
    }
}
const suaDanhMuc = async (req, res) => {

    let { tenhieu, hinhhieu, thutu, noibat, idhieu } = req.body
    await ThuongHieuModel.suaDanhMuc(tenhieu, hinhhieu, thutu, noibat, idhieu)
    res.redirect("/admin-danhmuc")

}
const insertDanhMuc = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    res.render("layout/mainView",
        {
            data:
            {
                title: "Thêm danh mục",
                page: "../danhmuc/insertDanhMuc",
                tieude: "THÊM DANH MỤC",
                session: session

            }
        })

}
const themDanhMuc = async (req, res) => {
    let { tenhieu, hinhhieu, thutu, noibat } = req.body
    await ThuongHieuModel.themDanhMuc(tenhieu, hinhhieu, thutu, noibat)
    res.redirect("/admin-danhmuc")

}
const xoaDanhMuc = async (req, res) => {
    let id = req.params.id
    await ThuongHieuModel.xoaDanhMuc(id)
    res.redirect("/admin-danhmuc")

}

export default { getAllDanhMuc, updateDanhMuc, suaDanhMuc, insertDanhMuc, themDanhMuc, xoaDanhMuc }