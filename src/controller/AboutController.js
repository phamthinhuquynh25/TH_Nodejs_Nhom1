import  express   from "express"

const getAboutPage = (req,res) => {
    return res.render("home",{data:{title: 'About page', content: 'admin@gamail.com',page:'about'}})
}
export default getAboutPage