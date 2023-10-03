import express from 'express'
const getHomePage = (req,res) => {
    return res.render("home",{data:{title: 'homepage',page:'main'}})
}
export default getHomePage