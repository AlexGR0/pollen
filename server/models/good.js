const {model,db} = require("nodejs-mysql-model")
db.createPool(require("../config/database").mysql)
module.exports = new model({
    tableName: "good",
    attributes: {
        id: {
            type: String,
            require:true
        },
        name:{
            type: String,
            require:true
        },
        price:{
            type: String,
            require:true
        },
        promotion:{
            type: String,
            require:true
        },
        topImg:{
            type: String,
            default:"[]"
        },
        introductImg:{
            type: String,
            default:"[]"
        },
        color:{
            type: String,
            default:"{}"
        },
        version:{
            type: String,
            default:"{}"
        },
        type:{
            type: String,
            default:"{}"
        },
        size:{
            type: String,
            default:"{}"
        },
        package:{
            type: String,
            default:"{}"
        },
        configure:{
            type: String,
            default:"{}"
        }
    }
})