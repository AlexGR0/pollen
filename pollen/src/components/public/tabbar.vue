<template>
  <div>
    <van-tabbar active-color="#ca141d" inactive-color="#787878" :route="true">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)">
      <span>{{item.title}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
    </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbars: [
        {
          name: "/home",
          title: "首页",
          normal: require("../../assets/public/tabbar/home.png"),
          active: require("../../assets/public/tabbar/home_h.png")
        },
        {
          name: "/cluster",
          title: "分类",
          normal: require("../../assets/public/tabbar/cluster.png"),
          active: require("../../assets/public/tabbar/cluster_h.png")
        },
        {
          name: "/found",
          title: "发现",
          normal: require("../../assets/public/tabbar/found.png"),
          active: require("../../assets/public/tabbar/found_h.png")
        },
        {
          name: "/cart",
          title: "购物车",
          normal: require("../../assets/public/tabbar/cart.png"),
          active: require("../../assets/public/tabbar/cart_h.png")
        },
        {
          name: "/mine",
          title: "我的",
          normal: require("../../assets/public/tabbar/mine.png"),
          active: require("../../assets/public/tabbar/mine_h.png")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>