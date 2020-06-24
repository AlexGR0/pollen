const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const history = require('connect-history-api-fallback');

// 导入路由模块
const userRouter = require("./router/user")
const goodRouter = require("./router/good")
const orderRouter = require("./router/order")
const addressRouter = require("./router/address")
const FoundListRouter = require("./router/FoundList")

const app = express()
app.use(history())

app.use(express.static("./dist"))

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//配置body-parser
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// 配置express-session
app.use(session({
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: true
}))

app.use(userRouter)
app.use(goodRouter)
app.use(orderRouter)
app.use(addressRouter)
app.use(FoundListRouter)

app.use(function(err, req, res, next) {
	return res.status(500).json({
		err_code: 500,
		message: err.message
	})
})

app.listen(3000,()=>{
    console.log("http://127.0.0.1:3000 Running...")
})