export default [
    {
        path: "/mine",
        component: (res) => require(["@/views/mine.vue"],res)
    },
    {
        path: "/inviteGift",
        name: "邀请有礼",
        component: (res) => require(["@/components/mine/inviteGift.vue"],res)
    },
    {
        path: "/purchase",
        name: "优享购",
        component: (res) => require(["@/components/mine/purchase.vue"],res)
    },
    {
        path: "/priority",
        name: "使用优购码",
        component: (res) => require(["@/components/mine/priority.vue"],res)
    },
    {
        path: "/address",
        name: "收货地址",
        component: (res) => require(["@/components/mine/addresses.vue"],res),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("user") && sessionStorage.getItem("user") != "null") {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: "/addressAdd",
        name: "增加收货地址",
        component: (res) => require(["@/components/mine/addressAdd.vue"],res)
    },
    {
        path: "/addressEdit",
        name: "编辑收货地址",
        component: (res) => require(["@/components/mine/addressEdit.vue"],res)
    },
    {
        path: "/allOrder",
        name: "订单中心",
        component: (res) => require(["@/components/mine/allOrder.vue"],res),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("user") && sessionStorage.getItem("user") != "null") {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: "/evaluateOrder",
        name: "评价中心",
        component: (res) => require(["@/components/mine/evaluateOrder.vue"],res),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("user") && sessionStorage.getItem("user") != "null") {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: "/setting",
        name: "设置",
        component: (res) => require(["@/components/mine/setting.vue"],res),
        beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem("user") && sessionStorage.getItem("user") != "null") {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: "/profile",
        name: "个人中心",
        component: (res) => require(["@/components/mine/setting/profile.vue"],res)
    },
    {
        path: "/updPwd",
        name: "设置新密码",
        component: (res) => require(["@/components/mine/setting/updPwd.vue"],res)
    },
    {
        path: "/updPayPwd",
        name: "更改支付密码",
        component: (res) => require(["@/components/mine/setting/updPayPwd.vue"],res)
    },
    {
        path: "/sponsor",
        name: "赞助",
        component: (res) => require(["@/components/mine/setting/sponsor.vue"],res)
    }
]