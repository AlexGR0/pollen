<template>
  <div class="updPwd">
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.go(-1)" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="box" v-for="(item, index) in box" :key="index">
        <p class="title">{{item.title}}</p>
        <input
          type="password"
          :placeholder="item.placeholder"
          v-model="item.val"
          @blur="onBlur(item)"
        />
        <span v-show="item.flag">密码不能少于8位且不能有空格</span>
      </div>
      <div class="pwdTip">
        <p class="pwdTitle">密码需满足以下要求：</p>
        <p class="pwdComplexity">1、至少8个字符</p>
        <p class="pwdComplexity">2、不能包含空格</p>
      </div>
    </div>

    <!-- 完成 -->
    <button class="sub" @click="sub(box)">保存修改</button>
    <div class="board"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      box: [
        { placeholder: "旧密码", val: "", flag: false, title: "输入旧密码" },
        { placeholder: "新密码", val: "", flag: false, title: "输入新密码" },
        { placeholder: "确认新密码", val: "", flag: false }
      ]
    };
  },
  methods: {
    sub(data) {
      let _this = this
      if (data[1].val != data[2].val) {
        Toast("输入新密码不一致");
        return;
      } else if (data[0].val == data[1].val) {
        Toast("请输入不同的密码");
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].flag || data[i].val == "") {
          Toast("请输入正确格式");
          return;
        }
      }
      this.$axios
        .post("/updPwd", {
          oldPwd:data[0].val,
          newPwd:data[1].val,
          userTel: sessionStorage.getItem("user")
        })
        .then(obj => {
          if(obj.data.err_code==1){
            Toast("密码错误，请重试")
            data.forEach(_=>_.val="")
          }else if(obj.data.err_code==0){
            Toast("修改成功")
            _this.$router.push("/setting")
          }
        });
    },
    onBlur(item) {
      if (item.val.length < 8 || item.val.indexOf(" ") > -1) {
        item.flag = true;
      } else {
        item.flag = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.updPwd {
  background-color: #fff;
}
.content {
  margin: 10px 0;
  padding: 0 24px;
  .box {
    position: relative;
    p.title {
      color: #191919;
      padding: 16px 0 8px 0;
      margin: 0;
    }
    input {
      width: 100%;
      border: 0;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      height: 3.8rem;
      line-height: 3.8rem;
      padding: 1px 0;
      margin-bottom: 20px;
    }
    span {
      position: absolute;
      bottom: -2px;
      display: block;
      color: #ca141d;
    }
  }
  .pwdTip {
    p {
      margin: 0;
      font-size: 14px;
    }
    p.pwdTitle {
      margin-bottom: 4px;
      color: #191919;
    }
    p.pwdComplexity {
      color: #808080;
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
.board {
  height: 28px;
  background-color: #fff;
}
</style>