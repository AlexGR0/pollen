<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.push('/mine')" />
        </template>
        <template #right>
          <van-icon name="shopping-cart-o" size="25" color="#555" @click="$router.push('/cart')" />
        </template>
      </van-nav-bar>
    </div>

    <div>
      <van-tabs v-model="active" sticky animated duration="1">
        <van-tab title="待评价">
          <com-order :payment="4" :data="order" :isFlag="showKeyboard" @showFlag="showFlag" @changeEval="changeEval"></com-order>
        </van-tab>
        <van-tab title="已评价">
          <com-order :payment="5" :data="order" :isFlag="showKeyboard" @showFlag="showFlag"></com-order>
        </van-tab>
      </van-tabs>
    </div>

    <van-number-keyboard
      :show="showKeyboard"
      @blur="showKeyboard = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import comOrder from "../public/comEval.vue";
export default {
  components: {
    comOrder
  },
  data() {
    return {
      active: 0,
      order: [],
      showKeyboard: false,
      pwd: "",
      updata: {}
    };
  },
  async created() {
    let _this = this;
    await this.$axios
      .post("/allOrder", {
        userTel: sessionStorage.getItem("user")
      })
      .then(obj => {
        if (obj.data.dataObj.err_code == 0) {
          _this.order = obj.data.data;
          _this.order.forEach(item => {
            let chooseArr = [];
            for (let i = 0; i < item.chooseItem.length; i++) {
              let choose = "";
              for (let k in JSON.parse(item.chooseItem[i])) {
                choose += JSON.parse(item.chooseItem[i])[k] + " ";
              }
              chooseArr.push(choose);
            }
            item.chooseItem = chooseArr;
          });
        }
      });
    if (this.$route.query.active == 1) {
      this.active = 1;
    } else if (this.$route.query.active == 2) {
      this.active = 2;
    }
  },
  methods: {
    showFlag(data) {
      this.showKeyboard = true;
      this.updata = data;
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
          await this.$axios
            .post("/updOrder", { data: this.updata })
            .then(obj => {
              if (obj.data.err_code == 0) {
                location.reload();
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
              rej({ msg: "操作失败", flag: false });
            } else if (obj.data.dataObj.err_code == 0) {
              res({ msg: "操作成功", flag: true });
            }
          });
      });
    },
    changeEval({evals,orderId,userId,active}){
      this.$axios.post("/updEval",{evals,orderId,userId,active}).then(obj=>{
        if(obj.data.err_code==0){
          Toast("评价完成")
          location.reload();
        }else{
          Toast("评价失败")
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>