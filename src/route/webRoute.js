import express from 'express'
import getHomePage from "../controller/HomeController"
import getAboutPage from "../controller/AboutController"
import notFound from "../controller/NotFoundController"
import getGroupPage from "../controller/GroupControllre"
// import {createUser, getAllUser} from "./../controller/UserController"
import UserController from "../controller/UserController"
const router = express.Router()
const initWebRoute = (app) => {
    // router.get('/',(req,res)=>{
    //     res.send('Home page')
    // })
    // note: neu sai home controller thi comment phan o tren lai
    router.get('/',getHomePage)
    router.get('/about',getAboutPage)
    router.get('/group',getGroupPage)
    router.get('/insert-new-user',UserController.createUser)
    router.get('/listuser',UserController.getAllUser)
    router.get('/login',UserController.login)
     //khong tim thay trang
    //  router.get('*',(req,res) => {
    //   res.status(404).send('khong tim thay trang') hoac
    //   res.render("pagenotfound",{data:{tiltle:'404 Page not found', content:'không tìm thấy trang'}}) 
    // })
    router.get('*',notFound)
    return app.use('/',router)
}
export default initWebRoute