const express = require("express")
const userRouter = express.Router()

const User = require("../controller/userController")

userRouter.post("/register", (req, res) => {
    User.register(req.body, req).then(codeObj => {
        res.status(200).json({
            dataObj: codeObj,
            user: req.session.user
        })
    })
})

userRouter.post("/login", (req, res) => {
    User.login(req.body, req).then(codeObj => {
        res.status(200).json({
            dataObj: codeObj,
            user: req.session.user
        })
    })
})

userRouter.post("/getUser",(req,res)=>{
    User.getUser(req,res)
})

userRouter.post("/updUser",(req,res)=>{
    User.updUser(req,res)
})

userRouter.post("/updPwd",(req,res)=>{
    User.updPwd(req,res)
})

userRouter.post("/updPayPwd",(req,res)=>{
    User.updPayPwd(req,res)
})

userRouter.get("/logout", (req, res) => {
    User.logout(req, res)
})

userRouter.post("/pwd",(req,res)=>{
    User.isPwd(req,res)
})

module.exports = userRouter