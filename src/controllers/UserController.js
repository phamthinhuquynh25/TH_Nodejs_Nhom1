import express from "express"
import UserModel from "../services/UserModel.js"
import roleModel from "../services/roleModel.js"
import bcrypt from "bcryptjs"


let session = {};
const kiemtrataikhoan = (username, pass, listUser) => {
    let dsTaiKhoan = listUser;
    let result = false;
    for (let i = 0; i < dsTaiKhoan.length; i++) {
        if (dsTaiKhoan[i].trangthai === 0 && username === dsTaiKhoan[i].user) {
            result = bcrypt.compareSync(pass, dsTaiKhoan[i].pass);
            return result;
        }
    }
    return result;
}
const login = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        res.redirect("/")
    } else {
        if (req.method === "POST") {
            let { taikhoan, matkhau } = req.body
            const listUser = await UserModel.getAllUser();
            let user = kiemtrataikhoan(taikhoan, matkhau, listUser);
            if (user == true) {
                req.session.user = await UserModel.userName(taikhoan)
                session.user = req.session.user;
                return res.redirect("/")
            } else {
                res.redirect("/login")
            }
        } else {
            return res.render("layout/loginView",
                {
                    data:
                    {
                        title: "Đăng nhập",
                    }
                })
        }
    }
}
const logout = async (req, res) => {
    if (req.session.user) {
        delete session.user;
        req.session.destroy();
        res.redirect("/")
    } else {
        res.redirect("/")
    }
}
const signup = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        res.redirect("/")
    } else {
        delete session.user;
        return res.render("layout/signupView",
            {
                data:
                {
                    title: "Tạo tài khoản",
                }
            })
    }
}
const dsTaiKhoan = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    const listTaiKhoan = await UserModel.getAllUser()
    let trangthai = []
    // for (const user of listTaiKhoan) {
    //     if (user.trangthai === 0) {
    //         trangthai.push("Hiệu lực")
    //     } else {
    //         trangthai.push("Vô hiệu")
    //     }
    // }

    return res.render("layout/mainView",
        {
            data:
            {
                title: "Danh sách tài khoản",
                page: "../taikhoan/dsTaiKhoan",
                rows: listTaiKhoan,
                tieude: "TÀI KHOẢN",
                trangthai: trangthai,
                session: session
            }
        })
}

const insertTaiKhoan = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
    } else {
        delete session.user;
    }
    var salt = bcrypt.genSaltSync(10);
    // Store hash in your password DB.
    let { tendk, email, user, pass } = req.body
    const userid = await UserModel.getAllUser()
    var hash = bcrypt.hashSync(pass, salt);
    if (!userid.user) {
        await UserModel.insertTaiKhoan(tendk, email, user, hash)
        res.redirect("/admin-taikhoan")
    } else {
        res.redirect("/signup")
    }
}
const updateTaiKhoan = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        if (req.session.user.quyen === 1) {
            if (req.method === "POST") {
                let { tendk, email, user, quyen, id } = req.body
                await UserModel.updateTaiKhoan(tendk, email, user, quyen, id)
                res.redirect("/admin-taikhoan")
            } else {
                let id = req.params.id
                const quyen = await roleModel.getAllRole()
                const userid = await UserModel.idUser(id)
                return res.render("layout/mainView",
                    {
                        data:
                        {
                            title: "Cập nhật tài khoản",
                            page: "../taikhoan/updateTaiKhoan",
                            rows: userid,
                            tieude: "CẬP NHẬT TÀI KHOẢN",
                            item: quyen,
                            session: session
                        }
                    })
            }
        } else {
            let iduser = req.session.user.id
            if (req.method === "POST") {
                if (await UserModel.idUser(iduser).user === req.body.user) {
                    let { tendk, email, user, quyen, id } = req.body
                    await UserModel.updateTaiKhoan(tendk, email, user, quyen, id)
                }
                res.redirect(`admin-taikhoan/${iduser}`)
            } else {
                const thongtinTaiKhoan = await UserModel.idUser(iduser)
                return res.render("layout/mainView",
                    {
                        data:
                        {
                            title: "Cập nhật tài khoản",
                            page: "../taikhoan/updateTaiKhoan",
                            rows: thongtinTaiKhoan,
                            tieude: "CẬP NHẬT TÀI KHOẢN",
                            session: session
                        }
                    })
            }


        }
    } else {
        delete session.user;
        res.redirect("/login")
    }
}
const deleteTaiKhoan = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        let id = req.params.id
        const user = await UserModel.idUser(id)
        let trangthai = 0;
        if (req.session.user.quyen === 1) {
            if (user.id != req.session.user.id) {
                if (user.trangthai === 0) {
                    trangthai = 1
                } else {
                    trangthai = 0
                }
                UserModel.deleteTaiKhoan(trangthai, id);
            }
            return res.redirect("/admin-taikhoan");
        } else {
            if (user.quyen != 1 && user.user == req.session.user.user // Nó xóa thằng khác
            ) {
                if (user.trangthai === 0) {
                    trangthai = 1
                } else {
                    trangthai = 0
                }
                UserModel.deleteTaiKhoan(trangthai, user.id)
                res.redirect("/logout")
            } else {
                res.redirect("/admin-taikhoan");
            }
        }
    } else {
        res.redirect("/login")
    }

}
const detailTaiKhoan = async (req, res) => {
    if (req.session.user) {
        session.user = req.session.user
        const id = req.params.id
        const detailTaiKhoan = await UserModel.idUser(id)
        let trangthai = []
        if (detailTaiKhoan.trangthai === 0) {
            trangthai.push("Hiệu lực")
        } else {
            trangthai.push("Vô hiệu")
        }

        res.render("layout/mainView",
            {
                data:
                {
                    title: "Chi tiết tài khoản",
                    page: "../taikhoan/detailTaiKhoan",
                    rows: detailTaiKhoan,
                    tieude: "CHI TIẾT TÀI KHOẢN",
                    trangthai: trangthai,
                    session: session
                }
            })
    } else {
        delete session.user;
        res.redirect("/login")
    }
}
export default { signup, login, dsTaiKhoan, insertTaiKhoan, updateTaiKhoan, deleteTaiKhoan, detailTaiKhoan, logout }