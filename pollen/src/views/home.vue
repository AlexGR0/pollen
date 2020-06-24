<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <img src="../assets/img/home/logo.png" alt class="logo" />
      <div class="search">
        <input type="text" placeholder="老用户福利" @click="$router.push('/search')" />
      </div>
      <div class="shortcut">
        <span class="message" @click="$router.push('/found')"></span>
        <router-link to="/login" v-show="!isLogin">登录</router-link>
        <router-link to="/mine" v-show="isLogin">
          <img src="../assets/public/user/head.jpg" alt />
        </router-link>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="slider">
      <div class="swiper-container sliderSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in imgData" :key="index">
            <img v-lazy="item.img" alt />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination sliderPagination"></div>
      </div>
    </div>

    <!-- 宫格 -->
    <div class="backpic">
      <div class="grid" v-for="(item, index) in grid" :key="index" @click="$router.push(item.path)">
        <span :class="item.icon"></span>
        <p>{{item.text}}</p>
      </div>
    </div>

    <!-- 商城头条 -->
    <div class="news">
      <div class="tag">商城头条</div>
      <div class="swiper-container newsSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">【互动赢好礼】3月26日！HUAWEI P40系列发布会倒计时</div>
          <div class="swiper-slide">【互动赢好礼】华为P40系列即将登场！带你回顾P系列发展史</div>
          <div class="swiper-slide">HUAWEI P40系列震撼登场！最全亮点解析带你了解</div>
          <div class="swiper-slide">官宣！华为P40系列 × EMUI 10.1</div>
        </div>
      </div>
      <div class="more">更多</div>
    </div>

    <!-- 限时购 -->
    <div class="seckill">
      <p class="title">
        <span class="left">限时购</span>
        <span class="icon"></span>
        <span class="time">
          <van-count-down :time="time" />
        </span>
        <span class="right">后结束</span>
      </p>
      <div class="content">
        <div class="swiper-container seckillSwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in seckill"
              :key="index"
              @click="$router.push(item.path)"
            >
              <div class="box">
                <img v-lazy="item.imgUrl" alt />
                <p>{{item.name}}</p>
              </div>
              <p class="redText">{{item.introduct}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片展示 -->
    <div class="imgPanel">
      <ul>
        <li>
          <img
            :src="require('../assets/img/home/imgPanel/1_1.png')"
            alt
            @click="$router.push('/detail?id=1')"
          />
        </li>
        <li>
          <img
            :src="require('../assets/img/home/imgPanel/1_2.jpg')"
            alt
            @click="$router.push('/detail?id=14')"
          />
          <img
            :src="require('../assets/img/home/imgPanel/1_3.jpg')"
            alt
            @click="$router.push('/detail?id=13')"
          />
        </li>
      </ul>
      <ul class="ul_2">
        <li>
          <img
            v-lazy="require('../assets/img/home/imgPanel/2_1.png')"
            alt
            @click="$router.push('/detail?id=1')"
          />
        </li>
        <li>
          <img
            v-lazy="require('../assets/img/home/imgPanel/2_2.jpg')"
            alt
            @click="$router.push('/detail?id=21')"
          />
        </li>
      </ul>
      <ul class="ul_2">
        <li>
          <img
            v-lazy="require('../assets/img/home/imgPanel/3_1.png')"
            alt
            @click="$router.push('/detail?id=3')"
          />
        </li>
        <li>
          <img
            v-lazy="require('../assets/img/home/imgPanel/3_2.jpg')"
            alt
            @click="$router.push('/detail?id=19')"
          />
        </li>
      </ul>
      <div class="list">
        <div class="listBox">
          <img
            v-lazy="require('../assets/img/home/imgPanel/list1.png')"
            alt
            @click="$router.push('/detail?id=3')"
          />
          <p class="name">HUAWEI Mate 30 Pro 5G</p>
          <p class="discount">享12期免息|赠碎屏险</p>
          <p class="price">￥5899</p>
        </div>
        <div class="listBox">
          <img
            v-lazy="require('../assets/img/home/imgPanel/list2.png')"
            alt
            @click="$router.push('/detail?id=18')"
          />
          <p class="name">荣耀20 s</p>
          <p class="discount">享12期免息|赠碎屏险</p>
          <p class="price">
            ￥1699
            <del>¥1999</del>
          </p>
        </div>
        <div class="listBox">
          <img
            v-lazy="require('../assets/img/home/imgPanel/list3.png')"
            alt
            @click="$router.push('/detail?id=9')"
          />
          <p class="name">HUAWEI nova 5 Pro</p>
          <p class="discount">享12期免息|赠碎屏险</p>
          <p class="price">￥2499</p>
        </div>
      </div>
    </div>

    <!-- 精品推荐 -->
    <div class="recommend">
      <div class="title">精品推荐</div>
      <div class="content">
        <freeSwiper :data="recommend"></freeSwiper>
      </div>
    </div>

    <!-- 手机 -->
    <div class="phone">
      <div class="title">手机</div>
      <div class="content">
        <fourImg :type="1" :data="phoneImg"></fourImg>
        <freeSwiper :data="phoneItem"></freeSwiper>
        <p class="more" @click="$router.push('/cluster')">
          发现更多手机
          <van-icon name="arrow" />
        </p>
      </div>
    </div>

    <!-- 笔记本 -->
    <div class="labtop">
      <div class="title">笔记本</div>
      <div class="content">
        <fourImg :type="2" :data="labtopImg"></fourImg>
        <freeSwiper :data="labtopItem"></freeSwiper>
        <p class="more" @click="$router.push('/cluster?id=3')">
          发现更多笔记本
          <van-icon name="arrow" />
        </p>
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
import freeSwiper from "../components/home/freeSwiper.vue";
import fourImg from "../components/home/fourImg.vue";
import Swiper from "swiper";
export default {
  components: {
    tabbar,
    freeSwiper,
    fourImg
  },
  created() {
    this.imgData = this.$store.state.home.imgData;
    this.grid = this.$store.state.home.grid;
    this.time = this.$store.state.home.time;
    this.seckill = this.$store.state.home.seckill;
    this.recommend = this.$store.state.home.recommend;
    this.phoneImg = this.$store.state.home.phoneImg;
    this.phoneItem = this.$store.state.home.phoneItem;
    this.labtopImg = this.$store.state.home.labtopImg;
    this.labtopItem = this.$store.state.home.labtopItem;
  },
  data() {
    return {
      imgData: [],
      grid: [],
      time: 0,
      seckill: [],
      recommend: [],
      phoneImg: [],
      phoneItem: [],
      labtopImg: [],
      labtopItem: []
    };
  },
  mounted() {
    new Swiper(".sliderSwiper", {
      autoplay: true,
      loop: true,
      pagination: {
        el: ".sliderPagination",
        clickable: true
      }
    });
    new Swiper(".newsSwiper", {
      direction: "vertical",
      autoplay: true,
      loop: true
    });
    new Swiper(".seckillSwiper", {
      slidesPerView: 4,
      spaceBetween: 6
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
@mixin swiper-slide() {
  text-align: center;
  font-size: 18px;
  background: #fff;

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
}
@mixin title() {
  padding: 20px 0 15px 0;
  font-size: 18px;
  color: #444;
  text-align: center;
}
p.more {
  margin: 0;
  text-align: center;
  font-size: 14px;
  height: 57px;
  line-height: 36px;
  padding: 20px 0 8px 0;
  color: #4a4a4a;
  .van-icon {
    position: relative;
    top: 2px;
  }
}
.header {
  display: flex;
  background-color: #fff;
  height: 42px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  .logo {
    position: absolute;
    left: 0.8rem;
    width: 64px;
    height: 14px;
    top: 50%;
    margin-top: -0.6rem;
  }
  .search {
    margin-left: 80px;
    flex: 1;
    input {
      width: 105%;
      height: 33px;
      background: url(../assets/img/home/icon_search.png) 10px center no-repeat;
      background-size: 20px 20px;
      padding-left: 37px;
      border: 0;
      background-color: rgba(155, 155, 155, 0.1);
      border-radius: 37px;
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .shortcut {
    padding: 0 8px;
    display: flex;
    height: 25px;
    margin: auto 0;
    span.message {
      width: 25px;
      height: 25px;
      background: url(../assets/img/home/icon_message_black.png) 0 2px no-repeat;
      background-size: 25px 25px;
      margin: 0 12px;
    }
    a {
      font-size: 14px;
      line-height: 25px;
      color: #4c4c4c;
      padding: 0 4px;
      height: 25px;
      img {
        height: 100%;
      }
    }
  }
}
.slider {
  margin-top: 42px;
  padding: 10px;
  background-color: #fff;
  .swiper-container {
    width: 100%;
    height: 100%;
    --swiper-pagination-color: #ffffff;
  }
  .swiper-slide {
    @include swiper-slide();
    border-radius: 10px;
    overflow: hidden;
    touch-action: none;
    img {
      width: 100%;
      height: 15rem;
    }
  }
}
.backpic {
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  .grid {
    width: 20%;
    padding: 10px 0;
    @for $i from 1 through 5 {
      span.icon_#{$i} {
        display: block;
        margin: 0 auto;
        width: 30px;
        height: 30px;
        background: url(../assets/img/home/backpic.png) no-repeat;
        background-size: 290px;
        background-position-x: $i * 11.11%;
      }
    }
    p {
      margin: 0;
      font-size: 12px;
      color: #000;
      text-align: center;
    }
  }
}
.news {
  height: 42px;
  overflow: hidden;
  display: flex;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 0 0 15px 15px;
  .tag {
    margin-left: 10px;
    padding: 10px 0;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    width: 80px;
    color: #333;
  }
  .more {
    color: #999;
    width: 60px;
    line-height: 20px;
    font-size: 12px;
    padding: 10px 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    font-size: 12px;
    line-height: 40px;
    padding-left: 10px;
    width: 90%;
    color: #4d4d4d;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.seckill {
  .title {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    height: 16px;
    .left {
      font-size: 16px;
      color: #4d4d4d;
      height: 100%;
      line-height: 16px;
    }
    .icon {
      width: 16px;
      height: 16px;
      background: url(../assets/img/home/seckill_title.png);
      background-size: 16px;
      position: relative;
      top: 2px;
      margin: 0 3px;
    }
    .time {
      position: relative;
      top: -3px;
      .van-count-down {
        font-size: 18px;
        color: #4d4d4d;
      }
    }
    .right {
      color: #9b9b9b;
      font-size: 10px;
      height: 100%;
      line-height: 16px;
      position: relative;
      margin-left: 4px;
      top: 0.5px;
    }
  }
  .content {
    margin: 0 10px;
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      @include swiper-slide();
      display: flex;
      flex-wrap: wrap;
      background-color: transparent;
      margin-bottom: 8px;
      .box {
        padding: 4px 0;
        background-color: #fff;
        border-radius: 15px;
        width: 100%;
        img {
          width: 64px;
          height: 64px;
          margin: 0 8px;
        }
        p {
          margin: 4px 0 0 0;
          font-size: 9px;
          color: #999;
          margin: 0 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      p.redText {
        color: #ca141d;
        text-align: center;
        margin: 0;
        font-size: 10px;
        height: 24px;
        line-height: 24px;
      }
    }
  }
}
.imgPanel {
  padding: 0 6px 10px 6px;
  background-color: #fff;
  ul {
    display: flex;
    margin-bottom: 3px;
    li {
      max-width: 50%;
      overflow: hidden;
      &:nth-child(2) {
        img {
          height: 50%;
        }
      }
      img {
        width: 100%;
      }
      &:nth-child(1) {
        margin-right: 3px;
        img {
          height: 100%;
        }
      }
    }
  }
  ul.ul_2 {
    li {
      display: flex;
      width: 50%;
      img {
        display: block;
        margin: auto;
        width: 100%;
        height: 100% !important;
      }
    }
  }
  .list {
    display: flex;
    .listBox {
      width: 33.33%;
      background-color: #f9f9f9;
      padding: 10px;
      margin-right: 3px;
      overflow: hidden;
      &:nth-last-child(1) {
        margin-right: 0;
        border-radius: 0 0 10px 0;
      }
      &:nth-child(1) {
        border-radius: 0 0 0 10px;
      }
      img {
        width: 75px;
        margin: 0 auto;
        display: block;
      }
      p {
        color: #333;
        font-size: 12px;
        padding-top: 8px;
        margin: 0;
        text-align: center;
      }
      p.discount {
        padding: 4px 0;
        color: #9b9b9b;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        min-width: 0;
      }
      p.price {
        padding-top: 3px;
        del {
          color: #999;
        }
      }
    }
  }
}
.recommend {
  background-color: #fff;
  padding-bottom: 18px;
  margin-bottom: 10px;
  .title {
    @include title();
  }
  .content {
    padding: 0 4px;
  }
}
.phone {
  margin: 10px 0;
  background-color: #fff;
  .title {
    @include title();
  }
  .content {
    padding: 0 6px;
  }
}
.labtop {
  margin: 10px 0;
  background-color: #fff;
  .title {
    @include title();
  }
  .content {
    padding: 0 6px;
  }
}
.footer {
  margin-bottom: 60px;
  background-color: #fff;
  padding: 5px 6px;
  p {
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