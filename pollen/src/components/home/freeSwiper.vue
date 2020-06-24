<template>
  <div>
    <div class="swiper-container freeSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in data" :key="index" @click="$router.push('/detail?id='+item.id)">
          <div class="box">
            <img v-lazy="item.imgUrl" alt />
            <p>{{item.introduct}}</p>
          </div>
          <div class="text">
            <p class="name">{{item.name}}</p>
            <p class="price">{{item.price}}<del>{{item.del}}</del></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  mounted() {
    new Swiper(".freeSwiper", {
      slidesPerView: 3,
      spaceBetween: 6,
      freeMode: true
    });
  },
  props:["data"]
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  .box {
    background-color: #fbfbfb;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 75%;
      height: 100%;
      display: block;
      margin: 22px auto 0 auto;
    }
    p{
        margin: 0;
        color: #9b9b9b;
        font-size: 11px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        background-color: rgba(155,155,155,0.1);
        padding: 0 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
  }
  .text{
      padding: 9px 7px 0 7px;
      p.name{
          font-size: 11px;
          text-align: center;
          margin: 0;
          color: #333;
      }
      p.price{
          font-size: 12px;
          text-align: center;
          margin: 0;
          color: #ca141d;
          del{
              color: #999;
          }
      }
  }
}
</style>