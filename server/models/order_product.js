const { model, db } = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "order_product",
    attributes: {
        goodId: {
            type: String,
            require:true
        },
        name: {
            type: String,
            require:true
        },
        price: {
            type: String,
            require:true
        },
        num: {
            type: String,
            require:true
        },
        imgUrl:{
            type: String,
            require:true
        },
        chooseItem: {
            type: String,
            require:true
        },
        userId: {
            type: String,
            require:true
        },
        orderId: {
            type: String,
            require:true
        }
    }
})