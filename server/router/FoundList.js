const express = require("express")
const FoundListRouter = express.Router()

const FoundList = require("../controller/foundListController")

FoundListRouter.get("/getFoundList",(req,res)=>{
    FoundList.getList(req,res)
})

module.exports = FoundListRouter