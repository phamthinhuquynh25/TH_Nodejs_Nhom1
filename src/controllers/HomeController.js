import SanPhamModel from "../services/SanPhamModel.js"
import ThuongHieuModel from "../services/ThuongHieuModel.js"
import session from "express-session";

const getHomePage = async (req, res) => {
    const listSanPham = await SanPhamModel.getAllSanPham()
    const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
    if (req.session.user) {
        session.user = req.session.user
        if (req.session.user.quyen === 1) {
            return res.render("layout/mainView",
                {
                    data: {
                        title: "Admin website",
                        page: "../trangchu/homeAdmin",
                        rows: listSanPham,
                        item: listThuongHieu,
                        session: session
                    }
                }
            )
        } else {
            return res.render("layout/mainView",
                {
                    data:
                    {
                        title: "Home website",
                        page: "../trangchu/homeUser",
                        rows: listSanPham,
                        item: listThuongHieu,
                        session: session
                    }
                }
            )
        }
    } else {
        delete session.user;
        return res.render("layout/mainView",
            {
                data:
                {
                    title: "Home website",
                    page: "../trangchu/homeUser",
                    rows: listSanPham,
                    item: listThuongHieu,
                    session: session
                }
            }
        )
    }
}
// const getAdminPage = async (req, res) => {
//     const listSanPham = await SanPhamModel.getAllSanPham()
//     const listThuongHieu = await ThuongHieuModel.getAllThuongHieu()
//     if (req.session.user) {
//         session.user = req.session.user
//     } else {
//         delete session.user;
//     }
//     return res.render("layout/mainView",
//         {
//             data:
//             {
//                 title: "Admin website",
//                 page: "../trangchu/homeAdmin",
//                 rows: listSanPham,
//                 item: listThuongHieu,
//                 session: session

//             }
//         })
// }


export default { getHomePage }