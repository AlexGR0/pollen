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

    <!-- 邀请区域 -->
    <div class="invitationArea">
      <img src="../../assets/img/mine/tool/invitation/inviteGift.jpg" alt />
      <img src="../../assets/img/mine/tool/invitation/loadingImg.jpg" alt />
      <div class="btn">
        <button>立即邀请好友</button>
      </div>
    </div>

    <!-- 更多 -->
    <activity></activity>
  </div>
</template>

<script>
import activity from "../public/activity.vue"
export default {
  components:{
    activity
  }
};
</script>

<style lang="scss" scoped>
.invitationArea {
  img {
    width: 100%;
  }
  .btn {
    width: 100%;
    padding: 0 16px 50px 16px;
    background-color: #fff;
    button {
      width: 100%;
      border: 0;
      color: #ffffff;
      font-size: 14px;
      height: 4.2rem;
      line-height: 4.2rem;
      border-radius: 4.2rem;
      background-image: linear-gradient(90deg, #e43e2d 0%, #ca141d 100%);
    }
  }
}
</style>