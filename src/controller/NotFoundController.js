import express from 'express'
const notFound = (req,res) =>{
    return res.render("pagenotfound",{data:{title:'404 page not found',content:'khong tim thay trang!'}})
}
export default notFound