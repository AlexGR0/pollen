export default {
    namespaced: true,
    state: {
        imgData: [
            { img: require("../assets/img/home/swiper/1.jpg") },
            { img: require("../assets/img/home/swiper/2.jpg") },
            { img: require("../assets/img/home/swiper/3.jpg") },
            { img: require("../assets/img/home/swiper/4.jpg") },
            { img: require("../assets/img/home/swiper/5.jpg") },
            { img: require("../assets/img/home/swiper/6.jpg") }
        ],
        grid: [
            { icon: "icon_1", text: "华为数码", path: "/cluster?id=1" },
            { icon: "icon_2", text: "Mate Xs", path: "/detail?id=4" },
            { icon: "icon_3", text: "荣耀数码", path: "/cluster?id=2" },
            { icon: "icon_4", text: "以旧换新" },
            { icon: "icon_5", text: "邀请有礼", path: "/inviteGift" }
        ],
        time: 30 * 60 * 60 * 1000,
        seckill: [
            {
                imgUrl: require("../assets/img/home/seckill/1.png"),
                name: "手表GT 2",
                introduct: "最高省30元",
                price: "",
                del: "",
                path: "/detail?id=51"
            },
            {
                imgUrl: require("../assets/img/home/seckill/2.png"),
                name: "荣耀20 PRO",
                introduct: "¥2499",
                price: "",
                del: "",
                path: "/detail?id=17"
            },
            {
                imgUrl: require("../assets/img/home/seckill/3.png"),
                name: "荣耀手表2",
                introduct: "优惠100+手环",
                price: "",
                del: "",
                path: "/detail?id=50"
            },
            {
                imgUrl: require("../assets/img/home/seckill/4.png"),
                name: "荣耀笔记本Pro",
                introduct: "3.28低至3999起",
                price: "",
                del: "",
                path: "/detail?id=25"
            },
            {
                imgUrl: require("../assets/img/home/seckill/5.png"),
                name: "nova 5z",
                introduct: "限时直降200元",
                price: "",
                del: "",
                path: "/detail?id=9"
            },
            {
                imgUrl: require("../assets/img/home/seckill/7.png"),
                name: "荣耀手环 5",
                introduct: "到手价159起",
                price: "",
                del: "",
                path: "/detail?id=54"
            },
            {
                imgUrl: require("../assets/img/home/seckill/8.png"),
                name: "FreeBuds 3",
                introduct: "优惠60享镌刻",
                price: "",
                del: "",
                path: "/detail?id=67"
            },
            {
                imgUrl: require("../assets/img/home/seckill/10.png"),
                name: "Sound X 音箱",
                introduct: "最高直降200",
                price: "",
                del: "",
                path: "/detail?id=62"
            },
            {
                imgUrl: require("../assets/img/home/seckill/12.png"),
                name: "华为立式无线充",
                introduct: "预订30抵50",
                price: "",
                del: "",
                path: "/detail?id=79"
            }
        ],
        recommend: [
            {
                id: 28,
                imgUrl: require("../assets/img/home/recommend/1.png"),
                introduct: "2K全面屏笔记本",
                name: "HUAWEI MateBook 13",
                price: "￥6999",
                del: ""
            },
            {
                id: 17,
                imgUrl: require("../assets/img/home/recommend/4.png"),
                introduct: "最高优惠500元",
                name: "荣耀20 Pro",
                price: "￥2499",
                del: "¥2699"
            },
            {
                id: 79,
                imgUrl: require("../assets/img/home/recommend/5.png"),
                introduct: "新品抢先订优惠20",
                name: "华为立式无线充电器",
                price: "￥199",
                del: ""
            },
            {
                id: 67,
                imgUrl: require("../assets/img/home/recommend/6.png"),
                introduct: "限时优惠60|享6期免息",
                name: "HUAWEI FreeBuds 3",
                price: "￥999",
                del: "￥1199"
            },
            {
                id: 32,
                imgUrl: require("../assets/img/home/recommend/7.png"),
                introduct: "高清全面屏",
                name: "HUAWEI MateBook D 15",
                price: "￥6599",
                del: ""
            },
            {
                id: 56,
                imgUrl: require("../assets/img/home/recommend/8.png"),
                introduct: "视频通话",
                name: "华为智慧屏",
                price: "￥6999",
                del: ""
            },
            {
                id: 2,
                imgUrl: require("../assets/img/home/recommend/9.png"),
                introduct: "赠好礼|享12期免息",
                name: "HUAWEI P30 Pro",
                price: "￥4488",
                del: ""
            },
            {
                id: 57,
                imgUrl: require("../assets/img/home/recommend/10.png"),
                introduct: "最高降1100+部分赠好礼",
                name: "荣耀智慧屏系列",
                price: "￥2999",
                del: "￥3799"
            },
            {
                id: 24,
                imgUrl: require("../assets/img/home/recommend/11.png"),
                introduct: "最高优惠300元",
                name: "荣耀Play3",
                price: "￥899",
                del: "￥1299"
            },
            {
                id: 38,
                imgUrl: require("../assets/img/home/recommend/12.png"),
                introduct: "千元内首选 护眼平板",
                name: "荣耀畅玩平板2 9.6英寸",
                price: "￥799",
                del: "￥999"
            }
        ],
        phoneImg: [
            {
                id: 10,
                imgUrl: require("../assets/img/home/fourImg/phone/1.jpg"),
                introduct: "最高领券减50",
                name: "华为畅享10 Plus",
                price: "￥1399",
                del: ""
            },
            {
                id: 21,
                imgUrl: require("../assets/img/home/fourImg/phone/2.jpg"),
                introduct: "优惠200",
                name: "荣耀9X PRO",
                price: "￥1999",
                del: "￥2199"
            },
            {
                id: 10,
                imgUrl: require("../assets/img/home/fourImg/phone/3.jpg"),
                introduct: "最高领券减100",
                name: "华为畅享10",
                price: "￥1299",
                del: ""
            },
            {
                id: 23,
                imgUrl: require("../assets/img/home/fourImg/phone/4.jpg"),
                introduct: "最高领券减300",
                name: "荣耀Play3",
                price: "￥899",
                del: "￥999"
            }
        ],
        phoneItem: [
            {
                id: 11,
                imgUrl: require("../assets/img/home/freeSwiper/phone/1.png"),
                introduct: "晒单赢好礼",
                name: "华为畅享9",
                price: "￥1799",
                del: ""
            },
            {
                id: 8,
                imgUrl: require("../assets/img/home/freeSwiper/phone/3.png"),
                introduct: "享6期免息",
                name: "HUAWEI nova 6 SE",
                price: "￥2199",
                del: ""
            },
            {
                id: 20,
                imgUrl: require("../assets/img/home/freeSwiper/phone/4.png"),
                introduct: "最高降500元",
                name: "荣耀20i",
                price: "￥1999",
                del: "￥2199"
            },
            {
                id: 9,
                imgUrl: require("../assets/img/home/freeSwiper/phone/5.png"),
                introduct: "限量赠好礼",
                name: "HUAWEI nova 5 Pro",
                price: "￥2499",
                del: ""
            },
            {
                id: 10,
                imgUrl: require("../assets/img/home/freeSwiper/phone/6.png"),
                introduct: "最高优惠180",
                name: "华为畅享 10S",
                price: "￥1569",
                del: "￥1599"
            }
        ],
        labtopImg: [
            {
                id: 34,
                imgUrl: require("../assets/img/home/fourImg/labtop/1.png"),
                introduct: "3K触控全面屏",
                name: "HUAWEI MateBook X Pro 2019款",
                price: "￥7999",
                del: ""
            },
            {
                id: 25,
                imgUrl: require("../assets/img/home/fourImg/labtop/2.png"),
                introduct: "100最高抵1300+赠好礼",
                name: "荣耀笔记本Pro",
                price: "￥5199",
                del: "￥5599"
            },
            {
                id: 26,
                imgUrl: require("../assets/img/home/fourImg/labtop/3.png"),
                introduct: "2K全面屏笔记本",
                name: "HUAWEI MateBook 14",
                price: "￥5899",
                del: ""
            },
            {
                id: 27,
                imgUrl: require("../assets/img/home/fourImg/labtop/4.png"),
                introduct: "100抵1100+赠耳机",
                name: "荣耀笔记本 锐龙版",
                price: "￥2999",
                del: ""
            }
        ],
        labtopItem: [
            {
                id: 32,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/1.png"),
                introduct: "赠配件+3期免息",
                name: "HUAWEI MateBook D 15",
                price: "￥6599",
                del: ""
            },
            {
                id: 29,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/2.png"),
                introduct: "订金100抵400",
                name: "荣耀笔记本15",
                price: "￥3599",
                del: ""
            },
            {
                id: 30,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/3.png"),
                introduct: "赠配件+3期免息",
                name: "HUAWEI MateBook D 14",
                price: "￥6499",
                del: ""
            },
            {
                id: 31,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/4.png"),
                introduct: "订金100抵500",
                name: "荣耀笔记本14",
                price: "￥4199",
                del: ""
            },
            {
                id: 36,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/5.png"),
                introduct: "金属一体化机身",
                name: "HUAWEI MateBook D",
                price: "￥5188",
                del: ""
            },
            {
                id: 33,
                imgUrl: require("../assets/img/home/freeSwiper/labtop/6.png"),
                introduct: "15小时长续航",
                name: "荣耀笔记本 intel版",
                price: "￥4699",
                del: ""
            }
        ]
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {}
}