<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <div class="left" :style="opacityStyle">
        <div class="tipUser" v-if="!isLogin">
          <img src="../assets/public/user/head.jpg" alt />
          <p class="landr">
            <router-link to="/login">登录</router-link>
            <span>/</span>
            <router-link to="/register">注册</router-link>
          </p>
        </div>
        <div class="User" v-if="isLogin">
          <img src="../assets/public/user/head.jpg" alt />
          <span>{{$store.state.user.userObj}}</span>
        </div>
      </div>
      <div class="right">
        <span @click="$router.push('/setting')"></span>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="userMsg">
      <img src="../assets/public/user/head.jpg" alt />
      <div class="box">
        <div class="tipUser" v-if="!isLogin">
          <p class="landr">
            <router-link to="/login">登录</router-link>
            <span>/</span>
            <router-link to="/register">注册</router-link>
          </p>
        </div>
        <div class="User" v-if="isLogin">
          <div>
            <p class="tel">{{$store.state.user.userObj}}</p>
            <p class="logout" @click="logout">退出登录</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="myOrder">
      <h4 class="title">
        我的订单
        <span @click="$router.push('/allOrder')">
          全部订单
          <van-icon name="arrow" />
        </span>
      </h4>
      <div class="content">
        <div class="box">
          <van-row>
            <van-col span="8" @click="$router.push('/allOrder?active=1')">
              <i></i>
              <p>待付款</p>
            </van-col>
            <van-col span="8" @click="$router.push('/allOrder?active=2')">
              <i></i>
              <p>待收货</p>
            </van-col>
            <van-col span="8" @click="$router.push('/evaluateOrder')">
              <i></i>
              <p>待评价</p>
            </van-col>
          </van-row>
        </div>
        <img v-lazy="require('../assets/img/mine/p40.png')" alt @click="$router.push('/detail?id=1')" />
      </div>
    </div>

    <!-- 我的工具 -->
    <div class="tool">
      <h4 class="title">我的工具</h4>
      <div class="content">
        <div
          class="box"
          v-for="(item, index) in tool"
          :key="index"
          @click="$router.push(item.route)"
        >
          <img v-lazy="item.imgUrl" alt />
          <p class="title">{{item.title}}</p>
        </div>
      </div>
    </div>

    <!-- 为你推荐 -->
    <div class="recommend">
      <h4>为你推荐</h4>
      <div class="content">
        <img v-lazy="require('../assets/img/mine/recommend/1.jpg')" alt @click="$router.push('/detail?id=34')"/>
        <img v-lazy="require('../assets/img/mine/recommend/2.jpg')" alt @click="$router.push('/detail?id=13')"/>
        <img v-lazy="require('../assets/img/mine/recommend/3.jpg')" alt @click="$router.push('/detail?id=51')"/>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <div class="box">
        <div v-show="!isLogin" @click="$router.push('/login')">登录</div>
        <span v-show="!isLogin">|</span>
        <div>反馈</div>
      </div>
      <p>Copyright © 2020</p>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/public/tabbar.vue";
import { Dialog } from "vant";
export default {
  components: {
    tabbar,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      opacityStyle: { opacity: 0 },
      tool: [
        {
          imgUrl: require("../assets/img/mine/tool/invitation.png"),
          title: "邀请有礼",
          route: "/inviteGift"
        },
        {
          imgUrl: require("../assets/img/mine/tool/bag.png"),
          title: "优享购",
          route: "/purchase"
        },
        {
          imgUrl: require("../assets/img/mine/tool/code.png"),
          title: "优购码",
          route: "/priority"
        },
        {
          imgUrl: require("../assets/img/mine/tool/address.png"),
          title: "收货地址",
          route: "/address"
        }
      ]
    };
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 10 && top <= 200) {
        let opacity = top / 200;
        opacity = opacity < 0.3 ? 0 : opacity;
        this.opacityStyle = { opacity };
      }
    },
    logout() {
      let _this = this;
      Dialog.confirm({
        title: "提示",
        message: "确认退出登录吗"
      })
        .then(() => {
          this.$axios.get("/logout").then(res => {
            if (res.data.err_code == 0) {
              _this.$store.commit("user/userStatus", null);
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
@mixin topLeft() {
  width: 100%;
  height: 100%;
  display: flex;
  img {
    height: 60%;
    margin: auto 0;
    display: block;
    border-radius: 50%;
  }
}
@mixin boxStyle() {
  background-color: #fff;
  margin: 8px 10px;
  padding: 10px;
  border-radius: 10px;
  h4 {
    display: flex;
    justify-content: space-between;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    span {
      font-size: 12px;
      color: #666;
      .van-icon {
        position: relative;
        top: 2px;
      }
    }
  }
}
.top {
  height: 42px;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 18px;
  background-color: #e41f2b;
  .left {
    height: 100%;
    width: 100%;
    .tipUser {
      @include topLeft();
      p.landr {
        margin: 0 0 0 10px;
        line-height: 42px;
        font-size: 16px;
        a,
        span {
          color: #ffffff;
        }
        span {
          margin: 0 3px;
          font-size: 14px;
        }
      }
    }
    .User {
      @include topLeft();
      span {
        line-height: 42px;
        font-size: 16px;
        margin-left: 10px;
        color: #ffffff;
      }
    }
  }
  .right {
    display: flex;
    span {
      width: 25px;
      height: 25px;
      display: block;
      background: url(../assets/img/mine/setting.png) 0 0 no-repeat;
      background-size: 25px;
      margin: auto 0;
    }
  }
}
.userMsg {
  margin-top: 41px;
  background-color: #e41f2b;
  display: flex;
  height: 9.5rem;
  padding: 1px 18px 30px 18px;
  img {
    height: 100%;
    border-radius: 50%;
    margin-right: 10px;
  }
  .box {
    flex: 1;
    height: 100%;
    .tipUser {
      height: 100%;
      display: flex;
      align-items: center;
      p {
        margin: 0;
        font-size: 22px;
        a,
        span {
          color: #ffffff;
        }
        span {
          margin: 0 3px;
        }
      }
    }
    .User {
      height: 100%;
      display: flex;
      align-items: center;
      & > div {
        margin: auto 0;
        p {
          margin: 0;
          color: #ffffff;
          &.tel {
            font-size: 16px;
          }
          &.logout {
            font-size: 12px;
            border: 1px solid #ccc;
            display: inline-block;
            padding: 0 10px;
            height: 20px;
            border-radius: 20px;
            background-color: #ccc;
          }
        }
      }
    }
  }
}
.myOrder {
  @include boxStyle();
  .content {
    .box {
      i {
        width: 4.2rem;
        height: 4.2rem;
        display: block;
        margin: 4px auto;
        background: url(../assets/img/mine/myOrder.png) no-repeat right center;
        background-size: 100% auto;
      }
      p {
        margin: 0;
        text-align: center;
        font-size: 12px;
      }
      & .van-col:nth-child(1) i {
        background-position: 0 0;
      }
      & .van-col:nth-child(2) i {
        background-position: 0 -4.2rem;
      }
    }
    img {
      width: 100%;
      height: 9.4rem;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
}
.tool {
  @include boxStyle();
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 8px 0;
    .box {
      width: 25%;
      margin-top: 6px;
      img {
        width: 50%;
        display: block;
        margin: 0 auto;
      }
      p.title {
        margin: 0;
        text-align: center;
        color: #666;
        font-size: 12px;
      }
    }
  }
}
.recommend {
  margin: 0 10px 10px 10px;
  h4{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 15px 0 10px;
  }
  .content {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 9.4rem;
      margin-bottom: 10px;
      border-radius: 10px;
      &:nth-last-child(1){
        margin: 0;
      }
    }
  }
}
.footer {
  margin-bottom: 60px;
  background-color: #fff;
  padding: 5px 6px;
  p{
    text-align: center;
  }
  .box {
    height: 2.2rem;
    line-height: 2.2rem;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #eaeaea;
    div {
      height: 100%;
      padding: 0 20px;
      font-size: 14px;
      color: #333;
    }
    span {
      font-size: 16px;
      color: #eaeaea;
      position: relative;
      top: -1px;
    }
  }
}
</style>