const express = require("express")
const addressRouter = express.Router()

const Address = require("../controller/addressController")

addressRouter.get("/address", (req, res) => {
    Address.showAddress(req, res)
})

addressRouter.post("/addressAdd", (req, res) => {
    Address.addressAdd(req, res)
})

addressRouter.get("/addressEdit", (req, res) => {
    Address.findOneAddress(req, res)
})

addressRouter.post("/addressEdit", (req, res) => {
    Address.addressEdit(req, res)
})

addressRouter.get("/addressDel", (req, res) => {
    Address.addressDel(req, res)
})

module.exports = addressRouter