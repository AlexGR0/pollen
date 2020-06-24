<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="back()" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 地址选择 -->
    <div class="chooseAddress">
      <p class="addAddress" @click="showAddress" v-show="JSON.stringify(this.chooseAddress)=='{}'">
        <span>+</span>选择地址
      </p>
      <div class="box" @click="showAddress" v-show="JSON.stringify(this.chooseAddress)!='{}'">
        <p class="user">
          <span class="name">{{chooseAddress.name}}</span>
          <span class="tel">{{chooseAddress.tel}}</span>
        </p>
        <p class="address">
          <span>{{chooseAddress.province+chooseAddress.city+chooseAddress.county}}</span>
          <span>{{chooseAddress.address}}</span>
        </p>
      </div>
    </div>
    <!-- 地址展示 -->
    <van-popup
      v-model="showAreaFlag"
      round
      position="bottom"
      class="showArea"
      :style="{ height: '50%' }"
    >
      <div class="top">
        <span class="choose">选择收货地址</span>
        <van-icon name="cross" size="20" @click="showAreaFlag=false" />
      </div>
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          default-tag-text="默认"
          add-button-text="+ 新增收货地址"
          @add="onAdd"
          @edit="onEdit"
          @click-item="clickItem"
        >
          <div class="empty" v-show="$store.state.address.addressList.length==0">
            <img src="../../assets/img/mine/new-address-empty.png" alt />
            <p>您没有收货地址</p>
          </div>
        </van-address-list>
      </div>
    </van-popup>

    <!-- 订单详情 -->
    <div class="orderDetail">
      <h5>订单编号：{{$route.query.id}}</h5>
      <van-swipe-cell>
        <div v-for="(item, index) in order_product" :key="index">
          <van-card
            :num="item.num"
            :price="item.price"
            :desc="item.chooseItem"
            :title="item.name"
            class="goods-card"
            :thumb="item.imgUrl"
          />
        </div>
      </van-swipe-cell>
    </div>

    <!-- 计算金额 -->
    <div class="calPrice">
      <p>
        <span class="left">商品总价</span>
        <span class="right">￥{{sum}}</span>
      </p>
      <p>
        <span class="left">配送费</span>
        <span class="right">+￥0</span>
      </p>
    </div>

    <!-- 支付栏 -->
    <div class="pay">
      <span>
        ￥
        <strong>{{sum}}</strong>
      </span>
      <button @click="paySubmit">支付</button>
    </div>
    <!-- 数字键盘 -->
    <div class="passwordBoard">
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      order_product: [],
      showAreaFlag: false,
      chosenAddressId: 0,
      addressList: [],
      chooseAddress: {},
      sum: 0,
      showKeyboard: false,
      pwd: ""
    };
  },
  async created() {
    let _this = this;
    await this.$axios
      .get("/getOrderProduct", {
        params: {
          orderId: _this.$route.query.id,
          userTel: sessionStorage.getItem("user")
        }
      })
      .then(obj => {
        if (obj.data.dataObj.err_code == 0) {
          _this.order_product = obj.data.data;
          _this.order_product.forEach(item => {
            let choose = "";
            for (let k in JSON.parse(item.chooseItem)) {
              choose += JSON.parse(item.chooseItem)[k] + " ";
            }
            item.chooseItem = choose;
          });
        }
      });
    await this.$axios
      .get("/address?user=" + sessionStorage.getItem("user"))
      .then(obj => {
        if (obj.data.dataObj.err_code == 1) {
          Toast("用户不存在");
          setTimeout(() => {
            _this.$router.push("/login");
          }, 1000);
        } else if (obj.data.dataObj.err_code == 2) {
          Toast("暂无地址");
          _this.$store.state.address.addressList = [];
          _this.$store.state.address.chosenAddressId = 0;
        } else if (obj.data.dataObj.err_code == 0) {
          _this.$store.state.address.addressList = obj.data.data;
          _this.$store.state.address.addressList.forEach(item => {
            _this.addressList.push({
              id: item.addressId,
              name: item.name,
              tel: item.tel,
              province: item.province,
              city: item.city,
              county: item.county,
              address: item.address,
              isDefault: eval(item.isDefault.toLowerCase())
            });
          });
          _this.chosenAddressId = _this.$store.state.address.chosenAddressId;
        }
      });
    this.order_product.forEach(item => {
      this.sum += item.price * item.num;
    });
  },
  methods: {
    showAddress() {
      this.showAreaFlag = true;
    },
    onAdd() {
      this.$router.push("/addressAdd");
    },
    onEdit(item) {
      this.$router.push("/addressEdit?id=" + item.id);
    },
    clickItem(item) {
      this.chooseAddress = item;
      setTimeout(() => {
        this.showAreaFlag = false;
      }, 200);
    },
    paySubmit() {
      if (JSON.stringify(this.chooseAddress) == "{}") {
        Toast("请选择收货地址");
      } else {
        this.showKeyboard = true;
        Toast("请输入6位数支付密码");
      }
    },
    async back() {
      let areaId = 0;
      let _this = this
      this.addressList.forEach(item => {
        if (item.isDefault == true) {
          areaId = item.id;
        }
      });
      await this.$axios
        .post("/orderInfo", {
          userTel: sessionStorage.getItem("user"),
          orderId: _this.$route.query.id,
          addressId:areaId,
          pay:false
        })
        .then(obj => {
          if(obj.data.err_code==0){
            _this.$router.push("/mine")
          }
        })
    },
    async onInput(key) {
      this.pwd = (this.pwd + key).slice(0, 6);
      if (this.pwd.length == 6) {
        let isPwdFlag = false;
        await this.isPwd()
          .then(res => {
            Toast(res.msg);
            isPwdFlag = res.flag;
          })
          .catch(err => {
            Toast(err.msg);
            isPwdFlag = err.flag;
          });
        if (isPwdFlag == true) {
          await this.createOrderInfo().then(res => {
            if (res.err_code == 0) {
              (this.pwd = ""), (this.showKeyboard = false);
              this.$router.push("/mine");
            } else {
              Toast("服务器忙，请稍后重试");
            }
          });
        }
      }
    },
    onDelete() {
      this.pwd = this.pwd.slice(0, this.pwd.length - 1);
    },
    isPwd() {
      return new Promise((res, rej) => {
        this.$axios
          .post("/pwd", {
            pwd: this.pwd,
            userTel: sessionStorage.getItem("user")
          })
          .then(obj => {
            if (obj.data.dataObj.err_code == 1) {
              this.pwd = "";
              rej({ msg: "支付失败", flag: false });
            } else if (obj.data.dataObj.err_code == 0) {
              res({ msg: "支付成功", flag: true });
            }
          });
      });
    },
    createOrderInfo() {
      let _this = this;
      return new Promise((res, rej) => {
        this.$axios
          .post("/orderInfo", {
            userTel: sessionStorage.getItem("user"),
            orderId: _this.$route.query.id,
            addressId: _this.chooseAddress.id,
            pay:true
          })
          .then(obj => {
            res(obj.data);
          })
          .catch(err => {
            rej(err.data);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chooseAddress {
  padding: 14px;
  background-color: #fff;
  position: relative;
  margin-bottom: 30px;
  p.addAddress {
    margin: 0;
    height: 20px;
    line-height: 20px;
    display: flex;
    span {
      display: block;
      margin: 0 10px;
      font-size: 16px;
      width: 20px;
      text-align: center;
      background-color: aqua;
      color: #fff;
    }
  }
  &::before {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 2px;
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    content: "";
    background-size: 80px;
  }
}
.showArea {
  .top {
    padding: 12px 25px 0 25px;
    display: flex;
    justify-content: space-between;
    span.choose {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.box {
  p.user {
    margin: 0;
    span {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      &:nth-child(1) {
        padding-right: 10px;
      }
    }
  }
  p.address {
    margin: 0;
    span {
      padding-right: 10px;
    }
  }
}
.orderDetail {
  margin-bottom: 30px;
  background-color: white;
  h5 {
    padding: 10px;
    margin: 0;
  }
  .goods-card {
    background-color: white;
    margin: 0;
  }
  .delete-button {
    height: 100%;
  }
}
.calPrice {
  margin-bottom: 60px;
  background-color: #fff;
  padding: 12px 16px;
  p {
    margin: 0;
    display: flex;
    justify-content: space-between;
    span.left {
      color: #333;
      font-size: 14px;
    }
    span.right {
      color: #ca151e;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
.pay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 6px 16px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  span {
    display: block;
    height: 100%;
    line-height: 38px;
    font-size: 18px;
    color: #ca151e;
    font-weight: bold;
    strong {
      font-size: 24px;
    }
  }
  button {
    padding: 0 15px;
    text-align: center;
    border: 0;
    width: 40%;
    border-radius: 38px;
    color: #fff;
    background-image: linear-gradient(90deg, #e43e2d 0, #ca141d 100%);
  }
}
.empty {
  img {
    display: block;
    width: 30%;
    margin: 2rem auto 0 auto;
  }
  p {
    margin: 0;
    text-align: center;
    font-size: 14px;
    padding-top: 10px;
    color: #999;
  }
}
</style>