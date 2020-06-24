<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name" left-arrow @click-left="$router.push('/mine')" />
    </div>

    <!-- 表单 -->
    <div class="content">
      <div class="box">
        <span class="icon"></span>
        <form action="/login" method="post">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="tel"
              placeholder="手机号"
              required="required"
              pattern="^1([38]\d|5[0-35-9]|7[3678])\d{8}$"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="密码"
              required="required"
            />
          </div>
          <van-button
            round
            type="info submit"
            size="large"
            @click.prevent="onSumbit({tel,password})"
          >登录</van-button>
          <van-button
            round
            hairline
            type="button"
            size="large"
            @click.prevent="$router.push('/register')"
          >注册账号</van-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      tel: "",
      password: ""
    };
  },
  methods: {
    onSumbit(value) {
      let _this = this;
      if (value.tel == "" || value.password == "") {
        Toast("请输入手机号或密码");
        return;
      }
      if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value.tel)) {
        Toast("请输入正确格式的手机号");
        return;
      }
      if (value.password.length < 8 || value.password.indexOf(" ") > -1) {
        Toast("密码长度大于8且不能出现空格");
        return;
      }
      this.$axios
        .post("/login", {
          tel: value.tel,
          password: value.password
        })
        .then(obj => {
          if (obj.data.dataObj.err_code == 0) {
            Toast("登录成功");
            //将用户信息放入sessionStorage
            sessionStorage.setItem("user", obj.data.user.tel);
            //将用户信息放入vuex
            this.$store.state.user.userObj = obj.data.user.tel;
            _this.$router.push("/home");
          } else if (obj.data.dataObj.err_code == 1) {
            Toast("用户名不存在或密码错误！");
          } else {
            Toast("服务器忙，请稍后重试！");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 46px;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  .box {
    margin: 0 auto;
    width: 70%;
    position: relative;
    top: -15%;
    button {
      margin: 5px 0;
    }
  }
}
span.icon {
  display: block;
  background: url(../../assets/img/profile/icon.png) 0 0 no-repeat;
  background-size: 3.3rem;
  width: 3.3rem;
  height: 3.3rem;
  margin: 30px auto;
  z-index: 1;
}
</style>