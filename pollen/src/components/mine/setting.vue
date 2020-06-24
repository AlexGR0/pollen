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

    <!-- 栏目 -->
    <div class="item">
      <div class="box" @click="$router.push('/profile')">
        <span class="left">个人中心</span>
        <van-icon name="arrow" size="10" color="#555"/>
      </div>
      <div class="box" @click="$router.push('/updPwd')">
        <span class="left">更改密码</span>
        <van-icon name="arrow" size="10" color="#555"/>
      </div>
      <div class="box" @click="$router.push('/updPayPwd')">
            <span class="left">更改支付密码</span>
            <van-icon name="arrow" size="10" color="#555"/>
        </div>
      <div class="box" @click="$router.push('/address')">
        <span class="left">收货地址</span>
        <van-icon name="arrow" size="10" color="#555"/>
      </div>
    </div>

    <!-- 赞助 -->
    <div class="item">
        <div class="box" @click="$router.push('/sponsor')">
            <span class="left" >赞助</span>
            <van-icon name="arrow" size="10" color="#555"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  margin-top: 10px;
  .box {
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
    height: 4.5rem;
    line-height: 4.5rem;
    border-bottom: 1px solid #eeeeee;
    &:nth-last-child(1) {
      border-bottom: 1px solid transparent;
    }
    .van-icon {
      line-height: 4.5rem;
    }
  }
}
</style>