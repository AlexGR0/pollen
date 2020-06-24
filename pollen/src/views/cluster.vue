<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="search">
        <input type="text" placeholder="老用户福利" @click="$router.push('/search')" />
      </div>
      <div class="shortcut">
        <span class="message"></span>
      </div>
    </div>

    <!-- 分类内容 -->
    <div class="content">
      <div class="left" ref="left">
        <ul>
          <li v-for="(item, index) in left" :key="index" @click="selectItem(index,$event)">
            <span :class="{con:index==currentIndex}">{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="right" ref="right">
        <ul class="bigBox">
          <li class="right-item" v-for="(item, index) in right" :key="index">
            <h4>{{item.title}}</h4>
            <ul>
              <li v-for="(ct, index) in item.content" :key="index" @click="$router.push('/detail?id='+ct.id)">
                <img v-lazy="ct.imgUrl" alt />
                <p>{{ct.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/public/tabbar.vue";
import BScroll from "better-scroll";
export default {
  components: {
    tabbar
  },
  created() {
    this.left = this.$store.state.cluster.left;
    this.right = this.$store.state.cluster.right;
  },
  data() {
    return {
      left: [],
      right: [],
      listHeight: [],
      scrollY: 0
    };
  },
  methods: {
    _initScroll() {
      this.lefts = new BScroll(this.$refs.left, {
        click: true,
        probeType: 3
      });
      this.rights = new BScroll(this.$refs.right, {
        click: true,
        probeType: 3
      });

      this.rights.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _getHeight() {
      let rightItems = this.$refs.right.getElementsByClassName("right-item");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < this.right.length; i++) {
        height += rightItems[i].offsetHeight;
        this.listHeight.push(height);
      }
    },
    selectItem(index, event) {
      if (!event._constructed) {
        return;
      } else {
        let rightItem = this.$refs.right.getElementsByClassName("right-item");
        let el = rightItem[index];
        this.rights.scrollToElement(el, 500);

        let leftItem = this.$refs.left.getElementsByTagName("li");
        let elLeft = leftItem[index];
        this.lefts.scrollToElement(elLeft, 500);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._getHeight();
      if ("id" in this.$route.query) {
        let rightItems = this.$refs.right.getElementsByClassName("right-item");
        let el = rightItems[this.$route.query.id-1];
        this.rights.scrollToElement(el);
      }
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  background-color: #fff;
  height: 42px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  .search {
    margin-left: 12px;
    flex: 1;
    input {
      width: 105%;
      height: 33px;
      background: url(../assets/img/home/icon_search.png) 10px center no-repeat;
      background-size: 20px 20px;
      padding-left: 37px;
      border: 0;
      background-color: rgba(155, 155, 155, 0.1);
      border-radius: 37px;
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .shortcut {
    padding: 0 8px;
    display: flex;
    height: 25px;
    margin: auto 0;
    span.message {
      width: 25px;
      height: 25px;
      background: url(../assets/img/home/icon_message_black.png) 0 2px no-repeat;
      background-size: 25px 25px;
      margin: 0 12px;
    }
  }
}
.content {
  position: absolute;
  top: 42px;
  bottom: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  overflow: hidden;
  .left {
    flex-basis: 25%;
    ul {
      position: relative;
      top: 0;
      li {
        padding: 1.6rem 0;
        &:nth-last-child(1) {
          padding-bottom: 40px;
        }
        span {
          margin-left: 16px;
          display: block;
          color: #333;
          font-size: 1.4rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
          &.con {
            color: #ca131d;
            border-right: 2px solid #ca131d;
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    .bigBox {
      position: relative;
      & > li {
        &:nth-last-child(1) {
          padding-bottom: 570px;
        }
        h4 {
          padding: 25px 0 8px 0;
          margin: 0;
          font-size: 16px;
          text-align: center;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 8px 0;
            width: 32.8%;
            img {
              width: 56%;
              margin: 0 auto;
              display: block;
            }
            p {
              color: #666;
              margin: 10px 0 0 0;
              padding: 0 17px;
              font-size: 11px;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>