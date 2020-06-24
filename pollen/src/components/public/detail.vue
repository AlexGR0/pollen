<template>
  <div>
    <!-- 顶部+轮播图 -->
    <div class="topImg">
      <div class="btns">
        <van-icon name="arrow-left" class="icon" @click="$router.go(-1)" />
        <van-icon name="more" color="#888" size="25px" @click="isTopList=!isTopList" />
        <ul v-show="isTopList">
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/search">搜索</router-link>
          </li>
          <li>
            <router-link to="/cluster">分类</router-link>
          </li>
          <li>
            <router-link to="/cart">购物车</router-link>
          </li>
          <li>
            <router-link to="/mine">我的</router-link>
          </li>
        </ul>
      </div>
      <div class="slider">
        <div class="swiper-container sliderSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in topImg" :key="index">
              <img v-lazy="item" alt />
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination sliderPagination"></div>
        </div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="goodMsg" v-show="data.length!=0">
      <p class="price">
        ￥
        <span>{{data.price}}</span>
      </p>
      <p class="name">{{data.name}}</p>
      <p class="promotion">{{data.promotion}}</p>
    </div>

    <!-- 选择栏 -->
    <div class="chooseItem" v-show="data.length!=0">
      <!-- 栏目 -->
      <div class="box" v-for="(item, index) in chooseItem" :key="index">
        <dl v-show="JSON.stringify(item.content)!='{}'">
          <dt>{{item.title}}</dt>
          <dd>
            <span
              :class="{con:item.chooseNum==indexs}"
              v-for="(ic, indexs) in item.content"
              :key="indexs"
              @click="item.chooseNum=indexs"
            >{{ic}}</span>
          </dd>
        </dl>
      </div>
      <!-- 数量 -->
      <dl>
        <dt>数量</dt>
        <dd>
          <van-stepper v-model="itemNum" />
        </dd>
      </dl>
      <!-- 免息 -->
      <dl>
        <dt>免息</dt>
        <dd>花呗分期直购，最高享12期免息</dd>
      </dl>
    </div>

    <!-- 图片介绍 -->
    <div class="introductImg">
      <p v-for="(item, index) in introductImg" :key="index">
        <img v-lazy="item" alt />
      </p>
    </div>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="$router.push('/home')" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
        :info="$store.state.cart.cartList.length"
      />
      <div class="buy" v-if="!isLogin">
        <van-goods-action-button
          color="linear-gradient(90deg,#e43e2d 0,#ca141d 100%)"
          type="danger"
          text="立即登录"
          @click="$router.push('/login')"
          class="buyButton"
        />
      </div>
      <div class="box" v-if="isLogin">
        <van-goods-action-button
          color="linear-gradient(90deg,#ff814a 0,#f45333 100%)"
          type="warning"
          text="加入购物车"
          @click="addToCart"
        />
        <van-goods-action-button
          color="linear-gradient(90deg,#e43e2d 0,#ca141d 100%)"
          type="danger"
          text="立即购买"
          @click="buyNow"
        />
      </div>
    </van-goods-action>
  </div>
</template>

<script>
import Swiper from "swiper";
import { Toast } from "vant";
export default {
  data() {
    return {
      isTopList: false, //省略控制
      chooseItem: [], //选择栏数据
      itemNum: 1, //数量
      data: [],
      topImg: [],
      introductImg: []
    };
  },
  methods: {
    addToCart() {
      let cartData = {
        id: this.data.id,
        name: this.data.name,
        price: this.data.price,
        num: this.itemNum,
        imgUrl: this.topImg[0],
        chooseItem: this.chooseItem
      };
      this.$store.commit("cart/addToCart", cartData);
    },
    async buyNow() {
      let chooseItem = {};
      let order_product = [];
      let _this = this
      let orderId = this.random_No();
      // 清理选项
      for (let k in this.chooseItem) {
        if (JSON.stringify(this.chooseItem[k].content) != "{}") {
          chooseItem[k] = this.chooseItem[k].content[
            this.chooseItem[k].chooseNum
          ];
        }
      }
      // 订单详情
      order_product.push({
        goodId: this.data.id,
        num: this.itemNum,
        imgUrl: this.topImg[0],
        chooseItem: JSON.stringify(chooseItem),
        orderId
      });
      await this.$axios
        .post("/orderProduct", {
          order_product,
          orderId,
          userTel: sessionStorage.getItem("user")
        })
        .then(obj => {
          if (obj.data.err_code == 0) {
            _this.$router.push("/order?id=" + orderId);
          } else {
            Toast("服务器繁忙，请稍后重试");
          }
        });
    },
    random_No() {
      let random_no = "";
      for (var i = 0; i < 10; i++) {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    }
  },
  created() {
    let _this = this;
    this.$axios.get("/detail?id=" + this.$route.query.id).then(obj => {
      if (obj.data.dataObj.err_code == 1) {
        Toast("无此商品,1秒后跳转回首页");
        setTimeout(() => {
          _this.$router.push("/home");
        }, 1000);
      } else if (obj.data.dataObj.err_code == 0) {
        (_this.data = obj.data.data[0]),
          (_this.chooseItem = {
            color: {
              title: "颜色",
              NumKey: "color",
              chooseNum: 0,
              content: JSON.parse(_this.data.color)
            },
            version: {
              title: "版本",
              NumKey: "version",
              chooseNum: 0,
              content: JSON.parse(_this.data.version)
            },
            type: {
              title: "类型",
              NumKey: "type",
              chooseNum: 0,
              content: JSON.parse(_this.data.type)
            },
            size: {
              title: "尺寸",
              NumKey: "size",
              chooseNum: 0,
              content: JSON.parse(_this.data.size)
            },
            package: {
              title: "套餐",
              NumKey: "package",
              chooseNum: 0,
              content: JSON.parse(_this.data.package)
            },
            configure: {
              title: "配置",
              NumKey: "configure",
              chooseNum: 0,
              content: JSON.parse(_this.data.configure)
            }
          });
        _this.topImg = JSON.parse(_this.data.topImg);
        _this.introductImg = JSON.parse(_this.data.introductImg);
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      new Swiper(".sliderSwiper", {
        observer: true,
        observeParents: true,
        pagination: {
          el: ".sliderPagination",
          type: "fraction"
        }
      });
    });
  },
  computed: {
    isLogin: function() {
      if (
        sessionStorage.getItem("user") &&
        sessionStorage.getItem("user") != "null"
      ) {
        this.$store.commit("user/userStatus", sessionStorage.getItem("user"));
      } else {
        this.$store.commit("user/userStatus", null);
      }
      return this.$store.getters["user/isLogin"];
    }
  }
};
</script>

<style lang="scss" scoped>
.topImg {
  .btns {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    display: flex;
    padding: 0 15px;
    margin-top: 10px;
    justify-content: space-between;
    .icon {
      width: 25px;
      height: 25px;
      font-size: 20px;
      background-color: #888;
      border-radius: 50%;
      color: #fff;
      &::before {
        position: relative;
        top: 2.5px;
        left: 2.5px;
      }
    }
    ul {
      position: absolute;
      right: 10px;
      top: 30px;
      border: 1px solid #ddd;
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
      li {
        padding: 0 20px 0 40px;
        border-bottom: 1px solid #dddddd;
        height: 4rem;
        line-height: 4rem;
        &:nth-child(1) {
          background: url(../../assets/public/tabbar/home.png) 1.2rem 0.9rem
            no-repeat;
          background-size: 20px;
        }
        &:nth-child(2) {
          background: url(../../assets/public/tabbar/search.png) 1.2rem 0.9rem
            no-repeat;
          background-size: 20px;
        }
        &:nth-child(3) {
          background: url(../../assets/public/tabbar/cluster.png) 1.2rem 0.9rem
            no-repeat;
          background-size: 20px;
        }
        &:nth-child(4) {
          background: url(../../assets/public/tabbar/cart.png) 1.2rem 0.9rem
            no-repeat;
          background-size: 20px;
        }
        &:nth-child(5) {
          background: url(../../assets/public/tabbar/mine.png) 1.2rem 0.9rem
            no-repeat;
          background-size: 20px;
          border-bottom: 0;
        }
        a {
          color: #333;
          font-size: 14px;
        }
      }
    }
  }
  .slider {
    .swiper-container {
      width: 100%;
      height: 100%;
      .sliderPagination {
        width: 15%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        background-color: #dddddd;
        border-radius: 10px;
        text-align: center;
        margin-left: 80%;
      }
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      box-shadow: 0 -15px 10px -15px #eee inset;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      height: 35rem;
      img {
        width: auto;
        height: 100%;
      }
    }
  }
}
.goodMsg {
  padding: 10px 16px;
  background-color: #fff;
  margin-bottom: 10px;
  p.price {
    margin-bottom: 6px;
    color: #ca141d;
    font-weight: bold;
    span {
      font-size: 20px;
    }
  }
  p.name {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  p.promotion {
    color: #ca141d;
    font-size: 12px;
    line-height: 13px;
    text-decoration: underline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.chooseItem {
  background-color: #fff;
  padding: 0 16px;
  dl {
    display: flex;
    padding: 6px 0;
    margin: 0;
    dt {
      height: 100%;
      padding-top: 7px;
      color: #888;
      font-size: 12px;
      font-weight: normal;
      flex-basis: 15%;
    }
    dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      span {
        margin: 4px 6px 4px 0;
        padding: 0 13px;
        border: 1px solid #888;
        color: #333;
        height: 2.5rem;
        line-height: 2.4rem;
        border-radius: 2.5rem;
        &.con {
          color: #ca141d;
          border: 1px solid #ca141d;
        }
      }
    }
    &:nth-last-child(1) {
      border-top: 1px solid #ddd;
      dd {
        padding-top: 7.5px;
      }
    }
  }
  & .box dl:nth-last-child(1) {
    border: 0;
    dd {
      padding-top: 0;
    }
  }
}
.introductImg {
  margin-bottom: 50px;
  margin-top: 10px;
  p {
    margin: 0;
    img {
      width: 100%;
    }
  }
}
.van-goods-action {
  div.box {
    flex: 1;
    height: 40px;
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    .van-button {
      width: 46.5%;
    }
  }
  div.buy {
    flex: 1;
    height: 40px;
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    .van-button {
      width: 95%;
    }
    .van-goods-action-button--first {
      border-radius: 20px;
    }
  }
}
</style>