<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <van-nav-bar :title="$route.name">
        <template #left>
          <van-icon name="arrow-left" size="25" color="#555" @click="$router.push('/mine')" />
        </template>
      </van-nav-bar>
    </div>

    <div class="priority">
      <input type="text" placeholder="请输入优购码" v-model="value" />
      <button @click="onSubmit(value)">使用优购码</button>
    </div>

    <!-- 更多 -->
    <activity></activity>
  </div>
</template>

<script>
import {Toast} from "vant";
import activity from "../public/activity.vue";
export default {
  components: {
    activity
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSubmit(value) {
      if(value=="6666"){
        Toast("兑换成功")
        this.$router.push("/home")
      }else{
        Toast("兑换失败")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.priority {
  padding: 10px 18px;
  display: flex;
  flex-wrap: wrap;
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
    color: #888;
  }
  button {
    margin: 28px auto;
    width: 100%;
    background-image: linear-gradient(90deg, #e43e2d 0, #ca141d 100%);
    color: #fff;
    border: 0;
    height: 3.8rem;
    border-radius: 3.8rem;
  }
}
</style>