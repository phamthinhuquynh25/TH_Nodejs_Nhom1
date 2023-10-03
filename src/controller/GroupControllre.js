import  express   from "express"

const getGroupPage = (req,res) => {
    return res.render("home",{data:{title: 'Group page',page:'newgroup'}})
}
export default getGroupPage