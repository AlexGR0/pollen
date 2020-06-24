const FoundList = require("../models/found_list")
module.exports = {
    async getList(req, res) {
        function sleep(ms){
            var end = new Date().getTime() + ms;
            while((new Date().getTime() - end) < ms ){
                continue;
            }
        }
        // 延迟一秒
        sleep(300);
        let startIndex = req.query.page * req.query.pageSize
        let num = parseInt(req.query.page) + 1
        FoundList.query("SELECT * FROM `found_list` LIMIT " + startIndex + "," + req.query.pageSize + "").then(ret => {
            res.status(200).json({
                err_code: 0,
                message: "ok",
                result: ret.vals,
                num
            })
        }).catch(err => {
            res.status(500).json({
                err: err,
                message: "error"
            })
        })
    }
}