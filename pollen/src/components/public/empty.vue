<template>
  <div>
    <img
      src="https://res.vmallres.com/nwap/20200230/images/echannelWap/icon/new-list-empty.png"
      alt
    />
    <p>您没有相应订单</p>

    <!-- 推荐 -->
    <div class="recommend">
      <h4>热门推荐</h4>
      <div
        class="box"
        v-for="(item, index) in recommend"
        :key="index"
        @click="$router.push('/detail?id='+item.id)"
      >
        <img v-lazy="item.imgUrl" alt />
        <p class="name">{{item.name}}</p>
        <p class="price">{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommend: []
    };
  },
  created() {
    this.recommend = this.$store.state.home.recommend;
  }
};
</script>

<style lang="scss" scoped>
.empty {
  img {
    width: 30%;
    margin: 50px auto 0 auto;
    display: block;
  }
  p {
    margin: 10px 0;
    color: #999;
    font-size: 16px;
    text-align: center;
  }
}
.recommend {
  padding: 0 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 100px;
  h4 {
    width: 100%;
    text-align: center;
    font-weight: 600;
    margin: 16px 0;
  }
  .box {
    width: 49%;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 10px;
    img {
      width: 78%;
      display: block;
      margin: 10px auto 0 auto;
    }
    p.name {
      font-size: 12px;
      text-align: center;
      width: 60%;
      margin: 8px auto 0 auto;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p.price {
      color: #ca131d;
      font-weight: 700;
      text-align: center;
      font-size: 14px;
      margin: 8px 0 15px 0;
    }
  }
}
</style>