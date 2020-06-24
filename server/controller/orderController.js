const User = require("../models/user")
const OrderProduct = require("../models/order_product")
const OrderInfo = require("../models/order_info")
module.exports = {
    async createOrderProduct(req, res) {
        let userId = 0
        let order_product = req.body.order_product
        await this.getUserId(req.body.userTel).then(_ => userId = _)
        order_product.forEach(item => {
            item.userId = userId
        })
        OrderProduct.saveAll(order_product).then(ret => {
            res.status(200).json({
                err_code: 0,
                message: "OK"
            })
        }).catch(err => {
            res.status(500).json({
                err_code: -1,
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        });
    },
    async getOrderProduct(req, res) {
        let order_product = []
        await OrderProduct.query("SELECT * FROM `order_product` where orderId='" + req.query.orderId + "'").then(ret => {
            order_product = ret.vals
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
        for (let i = 0; i < order_product.length; i++) {
            await this.getGood(order_product[i].goodId).then(goodData => {
                order_product[i].name = goodData.name
                order_product[i].price = goodData.price
            })
        }
        res.status(200).json({
            dataObj: {
                err_code: 0,
                message: "ok!"
            },
            data: order_product
        })
    },
    async createOrderInfo(req, res) {
        let userId = 0
        await this.getUserId(req.body.userTel).then(_ => userId = _)
        let pay = -1
        if (req.body.pay) {
            pay = 1
        } else {
            pay = -1
        }
        await OrderInfo.query("INSERT INTO `order_info` (`orderId`, `addressId`, `userId`, `paymentStatus`) VALUES ('" + req.body.orderId + "', '" + req.body.addressId + "', '" + userId + "', '" + pay + "')").then(() => {
            res.status(200).json({
                err_code: 0,
                message: "ok!"
            })
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
    },
    async getAllOrder(req, res) {
        let userId = 0;
        let allOrder = []
        await this.getUserId(req.body.userTel).then(_ => userId = _)
        await OrderProduct.query(`
        SELECT
            order_info.*,
        (
            SELECT
                group_concat(
                    order_product.goodId SEPARATOR '|'
                )
            FROM
                order_product
            WHERE
                order_product.orderId = order_info.orderId
            AND order_info.userId = order_product.userId
        ) AS goodId,
        (
            SELECT
                group_concat(
                    order_product.num SEPARATOR '|'
                )
            FROM
                order_product
            WHERE
                order_product.orderId = order_info.orderId
            AND order_info.userId = order_product.userId
        ) AS num,
        (
            SELECT
                group_concat(
                    order_product.imgUrl SEPARATOR '|'
                )
            FROM
                order_product
            WHERE
                order_product.orderId = order_info.orderId
            AND order_info.userId = order_product.userId
        ) AS imgUrl,
        (
            SELECT
                group_concat(
                    order_product.chooseItem SEPARATOR '|'
                )
            FROM
                order_product
            WHERE
                order_product.orderId = order_info.orderId
            AND order_info.userId = order_product.userId
        ) AS chooseItem,
        (
            SELECT
                group_concat(
                    good.name SEPARATOR '|'
                )
            FROM
                order_product,
                good
            WHERE
                good.id = order_product.goodId
            AND order_product.orderId = order_info.orderId
        ) AS name,
    (
            SELECT
                group_concat(
                    good.price SEPARATOR '|'
                )
            FROM
                order_product,
                good
            WHERE
                good.id = order_product.goodId
            AND order_product.orderId = order_info.orderId
        ) AS price
    FROM
        order_info
    WHERE
        userId=`+ userId + `
    `).then(ret => {
            allOrder = ret.vals
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
        allOrder.forEach(item => {
            item.goodId = item.goodId.split("|")
            item.num = item.num.split("|")
            item.imgUrl = item.imgUrl.split("|")
            item.chooseItem = item.chooseItem.split("|")
            item.name = item.name.split("|")
            item.price = item.price.split("|"),
                item.evaluation = parseInt(item.evaluation)
        })
        res.status(200).json({
            dataObj: {
                err_code: 0,
                message: "ok!"
            },
            data: allOrder
        })
    },
    async delOneOrder(req, res) {
        let msg = ""
        await OrderProduct.query("DELETE FROM `order_product` WHERE (`userId`='" + req.body.userId + "') AND (`orderId`='" + req.body.orderId + "')").then(() => {
            msg = "ok1"
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
        await OrderInfo.query("DELETE FROM `order_info` WHERE (`userId`='" + req.body.userId + "') AND (`orderId`='" + req.body.orderId + "')").then(() => {
            msg = "ok"
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
        if (msg == "ok1") {
            res.status(200).json({
                err_code: 1,
                message: "orderInfo is not find"
            })
        } else if (msg == "ok") {
            res.status(200).json({
                err_code: 0,
                message: "ok"
            })
        }
    },
    async updOrder(req, res) {
        if (req.body.data.sta == 1) {
            this.updStatus(req.body.data).then(resolved => {
                res.status(200).json(resolved)
            }).catch(err => {
                res.status(500).json(err)
            })
        } else if (req.body.data.sta == 2) {
            this.updStatus(req.body.data).then(resolved => {
                res.status(200).json(resolved)
            }).catch(err => {
                res.status(500).json(err)
            })
        }
    },
    async updEval(req, res) {
        await OrderInfo.query("UPDATE `order_info` SET `evaluation`='" + req.body.evals + "',`paymentStatus`='3' WHERE (`orderId`='" + req.body.orderId + "') AND (`userId`='" + req.body.userId + "')").then(() => {
            res.status(200).json({
                err_code: 0,
                message: "ok"
            })
        }).catch(err => {
            res.status(500).json({
                dataObj: err,
                message: "error"
            })
        })
    },
    getUserId(tel) {
        return new Promise((res, rej) => {
            User.query("select id from user where tel=" + "'" + tel + "'" + " LIMIT 1").then(ret => {
                res(ret.vals[0].id)
            }).catch(err => {
                rej(err)
            })
        })
    },
    getGood(id) {
        return new Promise((res, rej) => {
            User.query("select name,price from good where id=" + "'" + id + "'").then(ret => {
                res(ret.vals[0])
            }).catch(err => {
                rej(err)
            })
        })
    },
    updStatus(data) {
        return new Promise((res, rej) => {
            OrderInfo.query("UPDATE `order_info` SET `paymentStatus`='" + data.sta + "' WHERE (`orderId`='" + data.orderId + "') AND (`userId`='" + data.userId + "')").then(() => {
                res({
                    err_code: 0,
                    message: "ok"
                })
            }).catch(err => {
                rej({
                    dataObj: err,
                    message: "error"
                })
            })
        })
    }
}