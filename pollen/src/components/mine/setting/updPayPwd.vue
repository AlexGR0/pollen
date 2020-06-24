<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.go(-1)" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 旧密码 -->
    <div class="old">
      <p>
        输入旧支付密码，默认密码为
        <span>666666</span>
      </p>
      <van-password-input
        :value="oldValue"
        info="密码为 6 位数字"
        :focused="showKeyboard1"
        @focus="showKeyboard1 = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard1"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard1 = false"
      />
    </div>

    <!-- 新密码 -->
    <div class="new">
      <p>输入新密码</p>
      <van-password-input
        :value="newValue"
        info="密码为 6 位数字"
        :focused="showKeyboard2"
        @focus="showKeyboard2 = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard2"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard2 = false"
      />
    </div>

    <!-- 按钮 -->
    <button class="sub" @click="sub">保存修改</button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      oldValue: "",
      newValue: "",
      showKeyboard1: false,
      showKeyboard2: false
    };
  },
  methods: {
    onInput(key) {
      if (this.showKeyboard1) {
        this.oldValue = (this.oldValue + key).slice(0, 6);
        if (this.oldValue.length == 6) {
          this.showKeyboard1 = false;
        }
      }
      if (this.showKeyboard2) {
        this.newValue = (this.newValue + key).slice(0, 6);
        if (this.newValue.length == 6) {
          this.showKeyboard2 = false;
        }
      }
    },
    onDelete() {
      if (this.showKeyboard1) {
        this.oldValue = this.value1.slice(0, this.value1.length - 1);
      }
      if (this.showKeyboard2) {
        this.newValue = this.newValue.slice(0, this.newValue.length - 1);
      }
    },
    sub() {
        let _this=this
      if (this.oldValue.length != 6 || this.newValue.length != 6) {
        Toast("请输入正确格式");
        return;
      }
      this.$axios
        .post("/updPayPwd", {
          oldPwd: this.oldValue,
          newPwd: this.newValue,
          userTel: sessionStorage.getItem("user")
        })
        .then(obj => {
          if(obj.data.err_code==1){
            Toast("密码错误，请重试")
            _this.oldValue=_this.newValue=""
          }else if(obj.data.err_code==0){
            Toast("修改成功")
            _this.$router.push("/setting")
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.old,
.new {
  height: 20rem;
  padding: 2rem 0;
  p {
    margin: 10px 0;
    padding: 0 17px;
    font-size: 14px;
    font-weight: bold;
  }
}
button.sub {
  display: block;
  margin: 28px auto;
  width: 90%;
  background-image: linear-gradient(90deg, #e43e2d 0, #ca141d 100%);
  color: #fff;
  border: 0;
  height: 3.8rem;
  border-radius: 3.8rem;
}
</style>