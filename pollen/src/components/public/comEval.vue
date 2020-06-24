<template>
  <div class="com">
    <!-- 待评价 -->
    <div class="order" v-show="payment==4">
      <div class="empty" v-show="isOverData==0">
        <empty></empty>
      </div>
      <div class="box" v-for="(item, index) in data" :key="index">
        <div v-show="item.paymentStatus=='2'">
          <h5>
            订单编号：{{item.orderId}}
            <span v-if="item.paymentStatus!='-1'">交易完成</span>
            <span v-if="item.paymentStatus=='-1'">未支付</span>
          </h5>
          <ul>
            <li v-for="(good, index2) in item.goodId.length" :key="index2">
              <img :src="item.imgUrl[index2]" alt />
              <div class="text">
                <p class="name">{{item.name[index2]}}</p>
                <p class="chooseItem">{{item.chooseItem[index2]}}</p>
                <p class="msg">
                  <span class="price">￥{{item.price[index2]}}</span>
                  <span class="num">×{{item.num[index2]}}</span>
                </p>
              </div>
            </li>
          </ul>
          <p class="total">共 {{item.num.length}} 件商品，总计：￥{{total(item.num,item.price)}}</p>
          <p class="eval">
            <span>我的评价:</span>
            <van-rate v-model="item.evaluation" icon="like" color="#ee0a24" void-icon="like-o" @change="onChangeEval(item.evaluation,item.orderId,item.userId)" />
          </p>
          <div class="btns">
            <button class="del" @click="del(item.userId,item.orderId)">删除订单</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 已评价 -->
    <div class="order" v-show="payment==5">
      <div class="empty" v-show="isEvalData==0">
        <empty></empty>
      </div>
      <div class="box" v-for="(item, index) in data" :key="index">
        <div v-show="item.paymentStatus=='3'">
          <h5>
            订单编号：{{item.orderId}}
            <span v-if="item.paymentStatus!='-1'">交易完成</span>
            <span v-if="item.paymentStatus=='-1'">未支付</span>
          </h5>
          <ul>
            <li v-for="(good, index2) in item.goodId.length" :key="index2">
              <img :src="item.imgUrl[index2]" alt />
              <div class="text">
                <p class="name">{{item.name[index2]}}</p>
                <p class="chooseItem">{{item.chooseItem[index2]}}</p>
                <p class="msg">
                  <span class="price">￥{{item.price[index2]}}</span>
                  <span class="num">×{{item.num[index2]}}</span>
                </p>
              </div>
            </li>
          </ul>
          <p class="total">共 {{item.num.length}} 件商品，总计：￥{{total(item.num,item.price)}}</p>
          <p class="eval">
            <span>我的评价:</span>
            <van-rate
              v-model="item.evaluation"
              icon="like"
              color="#ee0a24"
              void-icon="like-o"
              disabled
              disabled-color="#ee0a24"
            />
          </p>
          <div class="btns">
            <button class="del" @click="del(item.userId,item.orderId)">删除订单</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import empty from "./empty.vue";
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    empty
  },
  props: ["payment", "data", "isFlag"],
  computed: {
    total() {
      return (num, price) => {
        let total = 0;
        num.forEach((item, index) => {
          total += item * price[index];
        });
        return total;
      };
    },
    isOverData() {
      return this.data.filter(_ => _.paymentStatus == 2).length;
    },
    isEvalData() {
      return this.data.filter(_ => _.paymentStatus == 3).length;
    }
  },
  methods: {
    pay(userId, orderId, sta) {
      this.$emit("showFlag", { userId, orderId, sta });
    },
    del(userId, orderId) {
      Dialog.confirm({
        title: "提示",
        message: "是否删除该订单"
      })
        .then(() => {
          this.$axios
            .post("/delOneOrder", {
              userId,
              orderId
            })
            .then(obj => {
              if (obj.data.err_code == 0) {
                location.reload();
              }
            });
        })
        .catch(() => {});
    },
    onChangeEval(evals, orderId, userId) {
      this.$emit("changeEval", { evals, orderId, userId, active: 1 });
    }
  }
};
</script>

<style lang="scss" scoped>
.com {
  margin: 10px 0 80px 0;
  .order {
    .box {
      margin-bottom: 10px;
      padding: 0 16px;
      background-color: #fff;
      h5 {
        color: #999;
        height: 42px;
        line-height: 42px;
        margin: 0;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 12px;
        }
      }
      ul {
        li {
          display: flex;
          height: 120px;
          padding: 15px 0;
          border-top: 1px solid #eaeaea;
          &:nth-last-child(1) {
            border-bottom: 1px solid #eaeaea;
          }
          img {
            margin: auto 0;
            height: 85%;
            display: block;
          }
          .text {
            flex: 1;
            margin-left: 12px;
            p.name {
              font-size: 12px;
              color: #333;
              margin: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            p.chooseItem {
              font-size: 10px;
              color: #999;
              margin: 10px 0;
            }
            p.msg {
              color: #333;
              font-size: 12px;
              display: flex;
              margin: 0;
              justify-content: space-between;
              span.price {
                color: #ca131d;
              }
            }
          }
        }
      }
      .total {
        text-align: right;
        margin: 10px 0;
      }
      .eval {
        display: flex;
        margin: 10px 0;
        justify-content: flex-end;
      }
      .btns {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 10px;
        button {
          background-color: #eaeaea;
          color: #333;
          height: 30px;
          line-height: 30px;
          text-align: center;
          padding: 0 10px;
          border: 0;
          margin-left: 5px;
          &.pay {
            background-color: #ca131d;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>