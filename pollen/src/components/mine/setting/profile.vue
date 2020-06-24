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

    <!-- 栏目 -->
    <div class="item">
      <van-field v-model="user.name" label="昵称" />
      <van-field v-model="user.tel" type="tel" label="手机号" readonly/>
      <div class="radio">
        <span>性别</span>
        <van-radio-group v-model="user.sex" direction="horizontal">
          <van-radio name="0" checked-color="#ca131d">保密</van-radio>
          <van-radio name="1" checked-color="#ca131d">男</van-radio>
          <van-radio name="2" checked-color="#ca131d">女</van-radio>
        </van-radio-group>
      </div>
      <van-field v-model="user.email" label="邮箱" />
    </div>

    <button class="sub" @click="onSubmit(user)">保存修改</button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      user: []
    };
  },
  created() {
    let _this = this;
    this.$axios
      .post("/getUser", { userTel: sessionStorage.getItem("user") })
      .then(obj => {
        if (obj.data.err_code == 0) {
          _this.user = obj.data.user;
        }
      })
      .catch(() => {
        Toast("服务器忙，请稍后重试");
        _this.$router.push("/mine");
      });
  },
  methods:{
    onSubmit(val){
      let _this= this
      if(val.name==""||val.email==""){
        Toast("输入框不能为空")
      }else if(!new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(val.email)){
        Toast("邮箱格式不正确")
      }else{
        this.$axios.post("/updUser",val).then(obj=>{
          if(obj.data.err_code==0){
            Toast("修改成功")
            _this.$router.push("/setting")
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin: 10px 0;
  .radio {
    margin: 0;
    padding: 10px 16px;
    background-color: #fff;
    display: flex;
    span {
      display: block;
      width: 90px;
    }
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