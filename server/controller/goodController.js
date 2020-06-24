const Good = require("../models/good")
module.exports = {
    async detail(req,res){
        await Good.query("select * from good where id=" + "'" + req.query.id + "'").then(ret=>{
            if (ret.vals.length == 0) {
                res.status(200).json({
                    dataObj:{
                        err_code: 1,
                        message: "good is not found!"
                    }
                })
            } else {
                res.status(200).json({
                    dataObj:{
                        err_code:0,
                        message:"ok!"
                    },
                    data:ret.vals
                })
            }
        }).catch(err=>{
            res.status(500).json({
                dataObj:err,
                message:"error"
            })
        })
    },
    async search(req,res){
        await Good.query("SELECT * FROM `good` where name like '%"+req.query.name+"%' LIMIT 1;").then(ret=>{
            if (ret.vals == 0) {
                res.status(200).json({
                    dataObj:{
                        err_code: 1,
                        message: "good is not found!"
                    }
                })
            } else {
                res.status(200).json({
                    dataObj:{
                        err_code:0,
                        message:"ok!"
                    },
                    data:ret.vals
                })
            }
        }).catch(err=>{
            res.status(500).json({
                dataObj:err,
                message:"error"
            })
        })
    }
}
