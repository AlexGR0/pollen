const User = require("../models/user")
const Address = require("../models/address")
module.exports = {
    async showAddress(req, res) {
        let userId = 0;
        await User.query("select id from user where tel=" + "'" + req.query.user + "'" + " LIMIT 1").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "user is not found!"
                    }
                })
            } else {
                userId = ret.vals[0].id
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
        await Address.query("select * from address where userId=" + "'" + userId + "'").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 2,
                        message: "address is not found!"
                    }
                })
            } else {
                res.status(200).json({
                    dataObj: {
                        err_code: 0,
                        message: "ok!"
                    },
                    data: ret.vals
                })
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
    },
    async addressAdd(req, res) {
        let userId = 0;
        // 查询用户ID
        await User.query("select id from user where tel=" + "'" + req.body.userTel + "'" + " LIMIT 1").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "user is not found!"
                    }
                })
            } else {
                userId = ret.vals[0].id
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
        // 判断是否更改默认地址
        if (req.body.isDefault == true) {
            await Address.query("UPDATE `address` SET `isDefault`='false' WHERE (`userId`='" + userId + "');")
        }
        //添加地址
        await Address.query("INSERT INTO `address` (`userId`, `name`, `tel`, `province`, `city`, `county`, `address`, `area_code`, `isDefault`) VALUES ('" + userId + "', '" + req.body.name + "', '" + req.body.tel + "', '" + req.body.province + "', '" + req.body.city + "', '" + req.body.county + "', '" + req.body.address + "', '" + req.body.area_code + "', '" + req.body.isDefault + "');").then(() => {
            res.status(200).json({
                err_code: 0,
                message: "OK"
            })
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
    },
    async findOneAddress(req, res) {
        let userId = 0;
        await User.query("select id from user where tel=" + "'" + req.query.userTel + "'" + " LIMIT 1").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "user is not found!"
                    }
                })
            } else {
                userId = ret.vals[0].id
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
        await Address.query("SELECT * FROM `address` WHERE userId='" + userId + "' AND addressId='" + req.query.addressId + "';").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 2,
                        message: "address is not found!"
                    }
                })
            } else {
                res.status(200).json({
                    dataObj: {
                        err_code: 0,
                        message: "ok"
                    },
                    data: ret.vals[0]
                })
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
    },
    async addressEdit(req, res) {
        let userId = 0;
        // 查询用户ID
        await User.query("select id from user where tel=" + "'" + req.body.userTel + "'" + " LIMIT 1").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "user is not found!"
                    }
                })
            } else {
                userId = ret.vals[0].id
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
        // 判断是否更改默认地址
        if (req.body.isDefault == true) {
            await Address.query("UPDATE `address` SET `isDefault`='false' WHERE (`userId`='" + userId + "');")
        }
        //修改地址
        await Address.query("UPDATE `address` SET `name`='" + req.body.name + "', `tel`='" + req.body.tel + "', `province`='" + req.body.province + "', `city`='" + req.body.city + "', `county`='" + req.body.county + "', `address`='" + req.body.address + "', `area_code`='" + req.body.area_code + "', `isDefault`='" + req.body.isDefault + "' WHERE (`userId`='" + userId + "' AND addressId='" + req.body.addressId + "');").then(ret => {
            res.status(200).json({
                err_code: 0,
                message: "OK"
            })
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
    },
    async addressDel(req, res) {
        let userId = 0;
        // 查询用户ID
        await User.query("select id from user where tel=" + "'" + req.query.userTel + "'" + " LIMIT 1").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "user is not found!"
                    }
                })
            } else {
                userId = ret.vals[0].id
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
        await Address.query("DELETE FROM `address` WHERE (`addressId`='" + req.query.addressId + "' AND `userId`='" + userId + "')").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 2,
                        message: "address is not found!"
                    }
                })
            } else {
                res.status(200).json({
                    dataObj: {
                        err_code: 0,
                        message: "ok"
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({
                dataObj: {
                    dataErr: err,
                    message: "error"
                }
            })
        })
    }
}
