export default [
    {
        path: "/home",
        name: "首页",
        component: (res) => require(["@/views/home.vue"],res)
    },
    {
        path: "/search",
        component: (res) => require(["@/components/home/searchPage.vue"],res)
    },
]