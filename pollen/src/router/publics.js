export default [
    {
        path: "/login",
        name: "登录",
        component: (res) => require(["../components/public/login.vue"],res)
    },
    {
        path: "/register",
        name: "注册",
        component: (res) => require(["../components/public/register.vue"],res)
    },
    {
        path: "/detail",
        name: "详情页",
        component: (res) => require(["../components/public/detail.vue"],res)
    },
    {
        path: "/order",
        name: "订单详情",
        component: (res) => require(["../components/public/order.vue"],res)
    }
]