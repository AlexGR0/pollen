<template>
  <div>
    <!-- 更多内容 -->
    <div class="activity">
      <van-divider :style="{ color: '#888', borderColor: '#888', padding: '0 50px' }">更多内容</van-divider>
      <div class="moreAct">
        <div
          class="box"
          v-for="(item, index) in moreAct"
          :key="index"
          @click="$router.push('/detail?id='+item.id)"
        >
          <img :src="item.imgUrl" alt />
          <p class="introduction">{{item.introduction}}</p>
          <p class="text">{{item.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moreAct: [
        {
          imgUrl: require("../../assets/img/mine/tool/public/1.jpg"),
          introduction: "华为P40系列开启首销",
          text: "邀好友返1%",
          id: 1
        },
        {
          imgUrl: require("../../assets/img/mine/tool/public/2.jpg"),
          introduction: "【荣耀30S 新品上市】",
          text: "邀好友返1%",
          id: 16
        },
        {
          imgUrl: require("../../assets/img/mine/tool/public/3.jpg"),
          introduction: "【荣耀笔记本 Pro 新品上市】",
          text: "邀好友返1%",
          id: 25
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.activity {
  margin: 30px 0;
  .box {
    background-color: #fff;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
    p.introduction {
      padding: 10px 16px 0 16px;
      margin: 0;
      font-size: 14px;
      color: #333;
    }
    p.text {
      padding: 0 16px 10px 16px;
      margin: 0;
      font-size: 12px;
      color: #888;
    }
  }
}
</style>