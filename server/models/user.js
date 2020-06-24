const {model,db} = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "user",
    attributes: {
        id: {
            type: String
        },
        tel: {
            type: "string",
            required: true
        },
        password: {
            type: "string",
            required: true
        },
        pay_pwd:{
            type:"string",
            require:true,
            default:"666666"
        },
        name: {
            type: "string",
            required: true
        },
        sex: {
            type: Number,
            enum: [0, 1, 2],
            default: 0
        },
        email: {
            type: "string",
            required: true
        }
    }
})