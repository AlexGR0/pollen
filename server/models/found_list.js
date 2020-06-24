const {model,db} = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "user",
    attributes: {
        fouundId: {
            type: "string"
        },
        imgUrl: {
            type: "string",
            required: true
        },
        name: {
            type: "string",
            required: true
        },
        promotion:{
            type: "string",
            required: true
        }
    }
})