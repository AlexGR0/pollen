<template>
  <div>
    <div class="bigBgShow" v-show="type==1">
      <div class="box" v-for="(item, index) in data" :key="index" @click="$router.push('/detail?id='+item.id)">
        <p class="imgP">
          <img v-lazy="item.imgUrl" alt />
          <span>{{item.introduct}}</span>
        </p>
        <div class="text">
          <p class="name">{{item.name}}</p>
          <p class="price">
            {{item.price}}
            <del>{{item.del}}</del>
          </p>
        </div>
      </div>
    </div>
    <div class="smallBgShow" v-show="type==2">
      <div class="box" v-for="(item, index) in data" :key="index" @click="$router.push('/detail?id='+item.id)">
        <p class="imgP">
          <img v-lazy="item.imgUrl" alt />
          <span>{{item.introduct}}</span>
        </p>
        <div class="text">
          <p class="name">{{item.name}}</p>
          <p class="price">
            {{item.price}}
            <del>{{item.del}}</del>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "data"]
};
</script>

<style lang="scss" scoped>
.bigBgShow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box {
    width: 49%;
    .imgP {
      overflow: hidden;
      border-radius: 10px;
      margin: 0;
      height: 11rem;
      position: relative;
      img {
        width: initial;
        max-width: initial;
        height: 100%;
      }
      span {
        position: absolute;
        bottom: 0;
        display: block;
        width: calc(100%);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);
        color: #ffffff;
        font-size: 12px;
        height: 1.6rem;
        line-height: 1.6rem;
        padding: 0 12px;
      }
    }
    .text {
      padding: 8px 13px 0 10px;
      p.name {
        margin: 0;
        color: #333;
        text-align: center;
        font-size: 14px;
      }
      p.price {
        margin: 0;
        text-align: center;
        color: #ca131d;
        font-size: 14px;
        padding: 4px 0 16px 0;
        del {
          color: #999;
        }
      }
    }
  }
}
.smallBgShow {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box {
    width: 49%;
    .imgP {
      overflow: hidden;
      border-radius: 10px;
      margin: 0;
      height: 11rem;
      position: relative;
      background-color: #f9f9f9;
      img {
        height: 70%;
        margin: 10px auto 0 auto;
        display: block;
      }
      span {
        position: absolute;
        bottom: 0;
        display: block;
        width: calc(100%);
        text-align: center;
        background-color: rgba(155,155,155,0.1);
        color: #9b9b9b;
        font-size: 12px;
        height: 1.6rem;
        line-height: 1.6rem;
        padding: 0 12px;
      }
    }
    .text {
      padding: 8px 13px 0 10px;
      p.name {
        margin: 0;
        color: #333;
        text-align: center;
        font-size: 14px;
      }
      p.price {
        margin: 0;
        text-align: center;
        color: #ca131d;
        font-size: 14px;
        padding: 4px 0 16px 0;
        del {
          color: #999;
        }
      }
    }
  }
}
</style>