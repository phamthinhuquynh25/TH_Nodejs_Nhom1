import UserModel from '../services/UserModel.js'
import bcrypt from "bcryptjs"
// import JWT from '../middleware/JWTAction.js'

const checkUserExist = async (user) => {
    let rows = await UserModel.userName(user)
    if (rows) {
        return true
    } else {
        return false
    }

}
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
const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.getAllUser()
        for (let i = 0; i < users.length; i++) {
            delete users[i].pass
            delete users[i].quyen
        }
        return res.status(200).json({
            errCode: 1,
            message: "Sucess",
            users: users
        })

    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail:" + err.message
        })
    }
}
const detailUser = async (req, res) => {
    try {
        let user = req.params.user
        if (await checkUserExist(user)) {
            const userName = await UserModel.userName(user)
            delete userName.pass
            delete userName.quyen
            delete userName.token
            delete userName.refresh_token

            return res.status(200).json({
                errCode: 1,
                message: "Sucess",
                users: userName
            })

        } else {
            return res.status(200).json({
                errCode: 4,
                message: "User not exist!",
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail:" + err.message
        })
    }
}
const createUser = async (req, res) => {
    try {
        let { tendk, email, user, pass } = req.body
        if (tendk != null
            && email != null
            && user != null
            && pass != null
        ) {
            if (await checkUserExist(user)) {
                return res.status(200).json({
                    errCode: 1,
                    message: "User exist",

                })
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(pass, salt);
                await UserModel.insertTaiKhoan(tendk, email, user, hash)
                const newUser = await UserModel.userName(user)
                delete newUser.pass
                delete newUser.quyen
                return res.status(200).json({
                    errCode: 2,
                    message: "Insert user success!",
                    user: newUser

                })
            }
        } else {
            return res.status(200).json({
                errCode: 3,
                message: "Lack of information!"
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const updateUser = async (req, res) => {
    try {
        let { tendk, email, user } = req.body
        if (tendk != null
            && email != null
            && user != null
        ) {
            let quyen
            let userUpdate = await UserModel.userName(user)
            if (await checkUserExist(user)) {
                if (userUpdate.quyen === 1) {
                    quyen = 1
                } else {
                    quyen = 2
                }
                await UserModel.updateTaiKhoan(tendk, email, quyen, user)
                const newUser = await UserModel.userName(user)
                delete newUser.pass
                delete newUser.idRole
                delete newUser.quyen
                delete newUser.token
                delete newUser.refresh_token
                return res.status(200).json({
                    errCode: 1,
                    message: "Update user success!",
                    user: newUser
                })
            } else {
                return res.status(200).json({
                    errCode: 2,
                    message: "User not exist 1",

                })
            }
        } else {
            return res.status(200).json({
                errCode: 3,
                message: "Lack of information!"
            })
        }
    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let { user } = req.body
        if (await checkUserExist(user)) {
            const userName = await UserModel.userName(user)
            if (userName.quyen != 1) {
                await UserModel.deleteUser(user);
                return res.status(200).json({
                    errCode: 1,
                    message: "Delete user success!",
                })
            } else {
                return res.status(200).json({
                    errCode: 4,
                    message: "Không xóa được tài khoản admin!",

                })
            }
        } else {
            return res.status(200).json({
                errCode: 3,
                message: "User not exist",
            })
        }

    } catch (err) {
        return res.status(400).json({
            errCode: 0,
            message: "Fail" + err.message
        })
    }
}
const login = async (req, res) => {
    try {
        let { userName, pass } = req.body
        if (userName != null && pass != null) {
            const listUser = await UserModel.getAllUser();
            let checkAccount = kiemtrataikhoan(userName, pass, listUser);
            if (checkAccount == true) {
                // let user = await UserModel.userName(userName)
                // let token = JWT.createJWT({ exp: Math.floor(Date.now() / 1000) + (60 * 60), user: user })
                // let refresh_token = JWT.createJWT({ exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), user: user });
                // await UserModel.updateToken(token, refresh_token, userName)

                let newUser = await UserModel.userName(userName)
                delete newUser.pass
                delete newUser.token
                delete newUser.refresh_token
                return res.status(200).json({
                    errCode: 2,
                    message: "Sucess!",
                    user: newUser
                })
            } else {
                return res.status(200).json({
                    errCode: 3,
                    message: "Đăng nhập không thành công!",

                })
            }
        } else {
            return res.status(200).json({
                errCode: 4,
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
// const logout = async (req, res) => {
//     try {
//         if (req.session.user) {
//             req.session.destroy();
//             return res.status(200).json({
//                 message: "User have logged!",
//             })
//         } else {
//             return res.status(200).json({
//                 message: "User have not logged!",
//             })
//         }
//     } catch (err) {
//         return res.status(400).json({
//             errCode: 0,
//             message: "Fail" + err.message
//         })
//     }
// }

export default { getAllUser, detailUser, createUser, updateUser, deleteUser, login, checkUserExist }