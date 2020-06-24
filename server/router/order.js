const express = require("express")
const orderRouter = express.Router()

const Order = require("../controller/orderController")

orderRouter.post("/orderProduct",(req,res)=>{
    Order.createOrderProduct(req,res)
})

orderRouter.get("/getOrderProduct",(req,res)=>{
    Order.getOrderProduct(req,res)
})

orderRouter.post("/orderInfo",(req,res)=>{
    Order.createOrderInfo(req,res)
})

orderRouter.post("/allOrder",(req,res)=>{
    Order.getAllOrder(req,res)
})

orderRouter.post("/delOneOrder",(req,res)=>{
    Order.delOneOrder(req,res)
})

orderRouter.post("/updOrder",(req,res)=>{
    Order.updOrder(req,res)
})

orderRouter.post("/updEval",(req,res)=>{
    Order.updEval(req,res)
})

module.exports = orderRouter