<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name" />
    </div>

    <!-- 商品卡片 -->
    <div class="cart" v-show="cartList.length!=0">
      <div class="box" v-for="(item, index) in cartList" :key="index">
        <div class="left">
          <van-checkbox v-model="item.isChecked" checked-color="#ca131d" @change="chooseItem"></van-checkbox>
        </div>
        <div class="center">
          <img :src="item.imgUrl" alt />
        </div>
        <div class="right">
          <p class="name">{{item.name}}</p>
          <p class="item">
            <span v-for="(choose, index) in item.chooseItem" :key="index">{{choose}};</span>
          </p>
          <div class="price_line">
            <span class="price">
              ￥
              <strong>{{item.price*item.num}}</strong>
            </span>
            <div class="step">
              <van-stepper v-model="item.num" @change="sum" />
            </div>
          </div>
          <div class="delBtn">
            <button @click="delItem(item.id)">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="submitBar" v-show="cartList.length!=0">
      <van-checkbox v-model="allCheck" checked-color="#ca131d" @change="allCheckBox">全选</van-checkbox>
      <div class="rightBox">
        <p>
          总计：
          <span>￥{{totalPrice}}</span>
        </p>
        <button @click="onSubmit">结算</button>
      </div>
    </div>

    <!-- 去购物 -->
    <div class="goToShop" v-show="cartList.length==0">
      <img src="../assets/img/cart/new-cart-empty.cc2a5c0.png" alt />
      <p>您的购物车没有商品</p>
      <router-link to="/home">去购物</router-link>
    </div>

    <!-- 推荐 -->
    <div class="recommend">
      <h4>热门推荐</h4>
      <div
        class="box"
        v-for="(item, index) in recommend"
        :key="index"
        @click="$router.push('/detail?id='+item.id)"
      >
        <img v-lazy="item.imgUrl" alt />
        <p class="name">{{item.name}}</p>
        <p class="price">{{item.price}}</p>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/public/tabbar.vue";
import { Toast } from "vant";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      cartList: [],
      allCheck: false,
      countFalg: 0,
      totalPrice: 0,
      recommend: []
    };
  },
  created() {
    this.cartList = this.$store.state.cart.cartList;
    this.chooseItem();
    this.recommend = this.$store.state.home.recommend;
  },
  methods: {
    delItem(id) {
      this.$store.commit("cart/delItem", id);
      this.sum();
    },
    allCheckBox() {
      this.sum();
      if (this.allCheck && this.countFalg != this.cartList.length) {
        this.cartList.forEach(_ => (_.isChecked = true));
      } else if (!this.allCheck && this.countFalg == this.cartList.length) {
        this.cartList.forEach(_ => (_.isChecked = false));
      }
    },
    chooseItem() {
      this.sum();
      let count = 0;
      this.cartList.forEach(item => {
        if (item.isChecked) {
          count++;
        }
      });
      if (count == this.cartList.length) {
        this.allCheck = true;
      } else {
        this.allCheck = false;
      }
      this.countFalg = count;
    },
    sum() {
      let price = 0;
      this.cartList.forEach(item => {
        if (item.isChecked) {
          price += item.price * item.num;
        }
      });
      this.totalPrice = price;
    },
    async onSubmit() {
      let order_product = [];
      let orderId = this.random_No();
      let _this = this;
      this.cartList.forEach(item => {
        if (item.isChecked == true) {
          order_product.push({
            goodId: item.id,
            num: item.num,
            imgUrl: item.imgUrl,
            chooseItem: JSON.stringify(item.chooseItem),
            orderId
          });
        }
      });
      if(order_product.length==0){
        Toast("未选择任何物品")
      }else{
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
        this.$store.state.cart.cartList=this.$store.state.cart.cartList.filter(_=>_.isChecked!=true)
        order_product=[]
      }
      
    },
    random_No() {
      let random_no = "";
      for (var i = 0; i < 10; i++) {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  height: 42px;
  overflow: hidden;
}
.cart {
  width: 100%;
  margin-bottom: 6.2rem;
  .box {
    margin: 0.8rem 1.2rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 15px 6px;
    display: flex;
    .left {
      display: flex;
      align-self: center;
      .van-checkbox {
        display: block;
      }
    }
    .center {
      width: 26%;
      img {
        width: 95%;
        display: block;
        margin: 0 auto;
      }
    }
    .right {
      flex: 1;
      p.name {
        color: #333;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p.item {
        span {
          color: #666;
          font-size: 12px;
        }
      }
      div.price_line {
        display: flex;
        justify-content: space-between;
        span.price {
          color: #ca131d;
          line-height: 28px;
          strong {
            font-size: 16px;
          }
        }
      }
      div.delBtn {
        display: flex;
        justify-content: flex-end;
        padding-top: 10px;
        button {
          border-radius: 2px;
          background-color: #ff0000;
          padding: 0 10px;
          font-size: 10px;
          height: 1.5rem;
          line-height: 1.5rem;
          border: 0;
          color: #fff;
        }
      }
    }
  }
}
.submitBar {
  position: fixed;
  background-color: #fff;
  width: 100%;
  bottom: 50px;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  padding: 0 8px 0 18px;
  .rightBox {
    display: flex;
    width: 70%;
    justify-content: flex-end;
    p {
      margin: 0;
      font-size: 16px;
      line-height: 5rem;
      span {
        color: #ca131d;
        font-weight: 700;
      }
    }
    button {
      width: 40%;
      height: 3.8rem;
      background: linear-gradient(90deg, #e43e2d, #ca141d);
      border: 0;
      color: #fff;
      margin: 6px 0 6px 13px;
      padding: 0 8px;
      border-radius: 3.8rem;
      line-height: 3.8rem;
      text-align: center;
      font-size: 16px;
    }
  }
}
.goToShop {
  padding: 33px 0 16px 0;
  text-align: center;
  img {
    width: 30%;
    display: block;
    margin: 0 auto;
  }
  p {
    margin: 8px 0;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
  a {
    padding: 0 20px;
    border: 1px solid #999;
    min-width: 4.5rem;
    height: 3rem;
    display: inline-block;
    line-height: 3rem;
    border-radius: 3rem;
    background-color: #fff;
    color: #666;
  }
}
.recommend {
  padding: 0 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 100px;
  h4 {
    width: 100%;
    text-align: center;
    font-weight: 600;
    margin: 16px 0;
  }
  .box {
    width: 49%;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 10px;
    img {
      width: 78%;
      display: block;
      margin: 10px auto 0 auto;
    }
    p.name {
      font-size: 12px;
      text-align: center;
      width: 60%;
      margin: 8px auto 0 auto;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p.price {
      color: #ca131d;
      font-weight: 700;
      text-align: center;
      font-size: 14px;
      margin: 8px 0 15px 0;
    }
  }
}
</style>