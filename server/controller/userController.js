const User = require("../models/user")
const md5 = require("blueimp-md5")
module.exports = {
    async register(value, req) {
        let data = {}
        await User.find('first', { where: "tel = " + value.tel }).then(res => {
            if (res.vals) {
                data = {
                    err_code: 1,
                    message: "telephone already exist!"
                }
            } else {
                value.password = md5(md5(value.password))
                value.pay_pwd = md5(md5(666666))
                User.saveAll([value])
                req.session.user = value
                data = {
                    err_code: 0,
                    message: "OK"
                }
            }
        }).catch(err => {
            data = err
        })
        return data;
    },
    async login(value, req) {
        let data = {}
        value.password = md5(md5(value.password))
        await User.query("select * from user where tel=" + "'" + value.tel + "'" + " and password=" + "'" + value.password + "'")
            .then(res => {
                if (res.vals == 0) {
                    data = {
                        err_code: 1,
                        message: "telephone is invalid!"
                    }
                } else {
                    req.session.user = value
                    data = {
                        err_code: 0,
                        message: "OK"
                    }
                }
            }).catch(err => {
                data = err
            })
        return data
    },
    async logout(req, res) {
        req.session.user = null
        res.status(200).json({
            err_code: 0,
            message: "ok"
        })
    },
    async isPwd(req, res) {
        await User.query("select id from user where tel=" + "'" + req.body.userTel + "' and pay_pwd='" + md5(md5(req.body.pwd)) + "'").then(ret => {
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj: {
                        err_code: 1,
                        message: "pwd is not found!"
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
    },
    async getUser(req, res) {
        User.query("SELECT tel,`name`,sex,email FROM `user` WHERE tel='" + req.body.userTel + "' LIMIT 1").then(ret => {
            res.status(200).json({
                user: ret.vals[0],
                err_code: 0,
                message: "ok"
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
    async updUser(req, res) {
        await User.query("UPDATE `user` SET `name`='" + req.body.name + "', sex='" + req.body.sex + "', email='" + req.body.email + "' WHERE (`tel`='" + req.body.tel + "')").then(() => {
            res.status(200).json({
                err_code: 0,
                message: "ok"
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
    async updPwd(req, res) {
        let flag = false
        await User.query("SELECT password FROM user WHERE tel='" + req.body.userTel + "'").then(ret => {
            if (ret.vals[0].password == md5(md5(req.body.oldPwd))) {
                flag = true
            } else {
                res.status(200).json({
                    err_code: 1,
                    message: "Pwd is wrong"
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
        if (flag) {
            await User.query("UPDATE `user` SET `password`='" + md5(md5(req.body.newPwd)) + "' WHERE (`tel`='" + req.body.userTel + "')").then(() => {
                res.status(200).json({
                    err_code: 0,
                    message: "ok"
                })
            }).catch(err => {
                res.status(500).json({
                    dataObj: {
                        dataErr: err,
                        message: "error"
                    }
                })
            })
        }
    },
    async updPayPwd(req, res) {
        let flag = false
        await User.query("SELECT pay_pwd FROM user WHERE tel='" + req.body.userTel + "'").then(ret => {
            if (ret.vals[0].pay_pwd == md5(md5(req.body.oldPwd))) {
                flag = true
            } else {
                res.status(200).json({
                    err_code: 1,
                    message: "Pwd is wrong"
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
        if (flag) {
            await User.query("UPDATE `user` SET `pay_pwd`='" + md5(md5(req.body.newPwd)) + "' WHERE (`tel`='" + req.body.userTel + "')").then(() => {
                res.status(200).json({
                    err_code: 0,
                    message: "ok"
                })
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
}