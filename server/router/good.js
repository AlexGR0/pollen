const express = require("express")
const goodRouter = express.Router()

const Good = require("../controller/goodController")

goodRouter.get("/detail", (req, res) => {
    Good.detail(req, res)
})

goodRouter.get("/search", (req, res) => {
    Good.search(req, res)
})

module.exports = goodRouter