const { model, db } = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "order_info",
    attributes: {
        orderId: {
            type: String,
            require: true
        },
        addressId: {
            type: String,
            require: true
        },
        userId: {
            type: String,
            require: true
        },
        evaluation: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 6],
            default: 0
        },
        paymentStatus: {
            type: Number,
            enum: [1, 2, 3, -1],
            default: -1
        }
    }
})