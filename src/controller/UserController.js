import  express  from "express"
import userModel from './../services/userModel'

const createUser = (req, res) => {
     return res.render("home",{data: {title: 'Tạo tài Khoản',page:'newUser'}})
}

const getAllUser = async (req, res) => {
      let userList = await userModel.getAllUser()
      return res.render("home",{data: {title: 'Danh sach tai khoan',page:'listUser', rows: userList }})
}
const login = (req,res) => {
      return res.render("home",{data:{title: 'Dang Nhap',page:'login'}})
}
const detaiUser = async (req, res)  =>{
      if (isAthentication(req, res) == true) {
            let user = req.params.username
            let dataUser = await userModel.detaiUser(user)
            // res.render('home', {data: data(req, 'Detail User', 'detaiUser', dataUser) })
            res.render('home', {data: {title: 'Detail User',page: 'detaiUser',rows: dataUser } })
      

      }
}
 export default {createUser, getAllUser,login}