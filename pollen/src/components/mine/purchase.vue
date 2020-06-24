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

    <!-- 内容 -->
    <div class="content">
      <img src="../../assets/img/mine/tool/purchase/easy_main.jpg" alt />
      <ul>
        <li v-for="(item, index) in content" :key="index" @click="$router.push('/detail?id='+item.id)">
          <p class="pImg">
            <img :src="item.imgUrl" alt />
          </p>
          <div class="text">
            <p class="name">{{item.name}}</p>
            <p class="adv">{{item.adv}}</p>
            <p class="price">{{item.price}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 更多 -->
    <activity></activity>
  </div>
</template>

<script>
import activity from "../public/activity.vue";
export default {
  components: {
    activity
  },
  data(){
    return {
      content:[
        {imgUrl:"https://res.vmallres.com/pimages/product/6901443381517/428_428_0410C56E4DFF825A527CBD3369F4D394F1699311CF51F864mp.png",name:"HUAWEI P40 Pro",adv:"超感知影像",price:"￥5988",id:1}
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  img {
    width: 100%;
  }
  ul {
    padding: 0 16px;
    background-color: #fff;
    li {
      display: flex;
      padding: 16px 0;
      border-top: 1px solid #ddd;
      p.pImg {
        margin: 0;
        width: 8.3rem;
      }
      div.text {
        position: relative;
        p.name {
          margin: 4px 0 0 0;
          font-size: 16px;
          color: #333;
        }
        p.adv {
          margin: 0;
          font-size: 14px;
          color: #888;
        }
        p.price {
          color: #ca131d;
          font-size: 15px;
          margin: 0;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
</style>