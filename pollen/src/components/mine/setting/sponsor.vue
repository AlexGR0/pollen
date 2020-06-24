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

    <div class="box">
        <p class="pay">微信支付</p>
        <img src="../../../assets/img/mine/sponsor.jpg" alt="">
        <p class="text">帮作者续费一天的服务器吧~~~///(^v^)\\\~~~</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box{
    p.pay{
        font-size: 24px;
        text-align: center;
        margin: 10px 0;
    }
    img{
        display: block;
        width: 60%;
        margin: 0 auto;
    }
    .text{
        margin: 10px 0;
        font-size: 24px;
        padding: 0 16px;
    }
}
</style>