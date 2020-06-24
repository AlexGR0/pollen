const { model, db } = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "address",
    attributes: {
        userId: {
            type: "string",
            require: true
        },
        addressId: {
            type: "string",
            require: true
        },
        name: {
            type: "string",
            require: true
        },
        tel: {
            type: "string",
            required: true
        },
        province: {
            type: "string",
            required: true
        },
        city: {
            type: "string",
            required: true
        },
        county: {
            type: "string",
            required: true
        },
        address: {
            type: "string",
            required: true
        },
        area_code: {
            type: "string",
            required: true
        },
        isDefault: {
            type: "string",
            required: true
        }
    }
})